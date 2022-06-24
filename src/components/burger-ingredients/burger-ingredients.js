import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { Scrollbars } from 'react-custom-scrollbars';

import IngredientDetails from '../ingredient-details/ingredient-details';

import dataIngredientsType from '../../utils/types';
import styleIngredients from './burger-ingredients.module.scss';

const Tabs = () => {
  const [current, setCurrent] = React.useState('bun');
  return (
    <div className={clsx(styleIngredients.tabs, 'mt-5 mb-10')} >
      <Tab value='bun' active={current === 'bun'} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value='sauce' active={current === 'sauce'} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value='main' active={current === 'main'} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  )
}

const IngredientCard = ({ image, price, name, counter = false }) => {
  return (
    <div className={clsx(styleIngredients.card)}>
      <img src={image} alt={name} className='ml-4 mr-4' />
      <div className={clsx(styleIngredients.card_price, 'mt-1 mb-1')}>
        <span className='text text_type_digits-default mr-2'>{price}</span> <CurrencyIcon type='primary' />
      </div>
      <div>
        <p className={clsx(styleIngredients.card_name, 'text text_type_main-default')}>{name}</p>
      </div>
      {counter &&
        <div className={styleIngredients.counter}>
          <Counter count={1} size='default' />
        </div>}
    </div>
  )
}

const CatalogGroup = (props) => {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState({});

  const handleOpenModal = (ingretient) => {
    setSelectedIngredient(ingretient);
    setModalVisibility(true);
  }

  const handleCloseModal = () => {
    setModalVisibility(false);
  }

  return (
    <>
      <h2 className='text text_type_main-medium mb-6'>{props.title}</h2>
      <div className={clsx(styleIngredients.catalog, 'pl-4 pr-4 mb-10')}>
        {props.data.filter(({ type }) => type === props.type).map((ingretient) => (
          <div key={ingretient._id} onClick={() => handleOpenModal(ingretient)}>
            <IngredientCard image={ingretient.image} price={ingretient.price} name={ingretient.name} counter={false} />
          </div>
        ))}
      </div>
      {modalVisibility && <IngredientDetails ingredient={selectedIngredient} closeModal={handleCloseModal} />}
    </>
  )
}

const BurgerIngredients = (props) => {
  const data = props.data;
  return (
    <section className={styleIngredients.content}>
      <h1 className={clsx(styleIngredients.title, 'text text_type_main-large mt-10')}>Соберите бургер</h1>
      <Tabs />
      <Scrollbars
        autoHeight={true}
        thumbMinSize={120}
        autoHeightMin={window.innerHeight - 285}
        renderTrackVertical={props => <div className={styleIngredients.track_vertical} />}
        renderThumbVertical={props => <div className={styleIngredients.thumb_vertical} />}
      >
        <CatalogGroup title='Булки' data={data} type='bun' />
        <CatalogGroup title='Соусы' data={data} type='sauce' />
        <CatalogGroup title='Начинка' data={data} type='main' />
      </Scrollbars>
    </section>
  );
}

IngredientCard.propTypes = {
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  counter: PropTypes.bool
}

CatalogGroup.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(dataIngredientsType).isRequired
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(dataIngredientsType).isRequired
};

export default BurgerIngredients;