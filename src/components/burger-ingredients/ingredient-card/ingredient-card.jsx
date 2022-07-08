import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import dataIngredientsType from '../../../utils/types';
import styleIngredientCard from './ingredient-card.module.scss';

const IngredientCard = ({ image, price, name, item }) => {
  const { constructorBun, constructorItems } = useSelector((store) => ({
    constructorBun: store.burgerConstructor.constructorBun,
    constructorItems: store.burgerConstructor.constructorItems
  }));

  const counter = useMemo(() => {
    if (constructorBun && constructorBun._id === item._id) {
      return 2
    } else if (constructorItems) {
      return constructorItems.filter((ingredient) => item._id === ingredient._id).length
    } else return 0
  }, [constructorBun, constructorItems, item._id])

  const [, bunDragRef] = useDrag({
    type: 'bun',
    item: { item }
  });

  const [, ingredientDragRef] = useDrag({
    type: 'ingredient',
    item: { item }
  });

  return (
    <div
      ref={item.type === 'bun' ? bunDragRef : ingredientDragRef}
      className={clsx(styleIngredientCard.card)}
    >
      <img src={image} alt={name} className='ml-4 mr-4' />
      <div className={clsx(styleIngredientCard.card_price, 'mt-1 mb-1')}>
        <span className='text text_type_digits-default mr-2'>{price}</span>{' '}
        <CurrencyIcon type='primary' />
      </div>
      <div>
        <p className={clsx(styleIngredientCard.card_name, 'text text_type_main-default')}>{name}</p>
      </div>
      {!!counter && (
        <div className={styleIngredientCard.counter}>
          <Counter count={counter} size='default' />
        </div>
      )}
    </div>
  );
};

IngredientCard.propTypes = {
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  item: dataIngredientsType.isRequired
};

export default IngredientCard;