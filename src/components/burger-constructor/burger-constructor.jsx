import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styleConstructor from './burger-constructor.module.scss';
import { Scrollbars } from 'react-custom-scrollbars';
import clsx from 'clsx';
import { v4 as uuidv4 } from 'uuid';

import { addIngredient, MOVE_INGREDIENT } from '../../services/actions/constructor-actions';

import Total from './total/total';
import ConstructorItem from './constructor-item/constructor-item';

const BurgerConstructor = () => {
  const { constructorBun, constructorItems } = useSelector((store) => ({
    constructorBun: store.burgerConstructor.constructorBun,
    constructorItems: store.burgerConstructor.constructorItems
  }));

  const dispatch = useDispatch();

  const [{ bunDropHover }, bunDropTarget] = useDrop({
    accept: 'bun',
    collect: (monitor) => ({
      bunDropHover: monitor.isOver()
    }),
    drop ({ item }) {
      dispatch(addIngredient(item));
    }
  });

  const [{ ingredientDropHover }, ingredientDropTarget] = useDrop({
    accept: 'ingredient',
    collect: (monitor) => ({
      ingredientDropHover: monitor.isOver()
    }),
    drop ({ item }) {
      dispatch(addIngredient(item, uuidv4()));
    }
  });

  const moveItem = useCallback(
    (dragIndex, hoverIndex) => {
      const ingredients = [...constructorItems];
      ingredients.splice(hoverIndex, 0, ingredients.splice(dragIndex, 1)[0]);
      dispatch({ type: MOVE_INGREDIENT, ingredients });
    },
    [dispatch, constructorItems]
  );

  return (
    <section className={clsx(styleConstructor.content, 'pl-4')}>
      <div className={clsx(styleConstructor.wrapper, 'mt-25')}>
        <div
          className={clsx(
            'ml-8 mr-4',
            bunDropHover ? styleConstructor.bun_dropzone_hover : styleConstructor.bun_dropzone
          )}
          ref={bunDropTarget}
        >
          {constructorBun && (
            <ConstructorElement
              type='top'
              isLocked={true}
              text={constructorBun.name.concat(' (верх)')}
              price={constructorBun.price}
              thumbnail={constructorBun.image}
            />
          )}
          {!constructorBun && (
            <div className={clsx(styleConstructor.empty_bun, styleConstructor.top)}>
              Добавьте булку
            </div>
          )}
        </div>
        {!constructorItems.length && (
          <div
            className={clsx(
              'ml-8 mr-4',
              ingredientDropHover ? styleConstructor.ingredients_dropzone_hover : ''
            )}
            ref={ingredientDropTarget}
          >
            <div className={styleConstructor.empty_ingredients}>Добавьте ингредиент</div>
          </div>
        )}
        {!!constructorItems.length && (
          <Scrollbars
            autoHeight={true}
            thumbMinSize={120}
            autoHeightMin={window.innerHeight - 536}
            renderTrackVertical={() => <div className={styleConstructor.track_vertical} />}
            renderThumbVertical={() => <div className={styleConstructor.thumb_vertical} />}
          >
            <div className={clsx(styleConstructor.catalog, 'pr-4')} ref={ingredientDropTarget}>
              {constructorItems.map((ingredient, index) => (
                <ConstructorItem
                  key={ingredient.position}
                  ingredient={ingredient}
                  index={index}
                  moveItem={moveItem}
                />
              ))}
            </div>
          </Scrollbars>
        )}
        <div className='pl-8 pr-4'>
          {!!constructorBun && (
            <ConstructorElement
              type='bottom'
              isLocked={true}
              text={constructorBun.name.concat(' (низ)')}
              price={constructorBun.price}
              thumbnail={constructorBun.image}
            />
          )}
          {!constructorBun && (
            <div className={clsx(styleConstructor.empty_bun, styleConstructor.bottom)}>
              Добавьте булку
            </div>
          )}
        </div>
      </div>
      <Total />
    </section>
  );
};

export default BurgerConstructor;
