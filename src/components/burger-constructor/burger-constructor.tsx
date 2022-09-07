import React, { FC, useCallback } from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import styleConstructor from './burger-constructor.module.scss';
import { Scrollbars } from 'react-custom-scrollbars';
import clsx from 'clsx';
import { v4 as uuidv4 } from 'uuid';

import { addIngredient, moveIngredient } from '../../services/reducers/constructor-reducer';

import Total from './total/total';
import ConstructorItem from './constructor-item/constructor-item';
import BunElement from './bun-element/bun-element';
import { TIngredientItem } from '../../utils/types';
import { useDispatch, useSelector } from '../../utils/hooks';

const BurgerConstructor: FC = (): JSX.Element => {
  const constructorItems = useSelector((store) => store.burgerConstructor.constructorItems);

  const dispatch = useDispatch();

  const [{ ingredientDropHover }, ingredientDropTarget] = useDrop({
    accept: 'ingredient',
    collect: (monitor: DropTargetMonitor) => ({
      ingredientDropHover: monitor.isOver(),
    }),
    drop(ingredient: TIngredientItem) {
      const position = uuidv4();
      dispatch(addIngredient({ ...ingredient, position }));
    },
  });

  const moveItemHandler = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const ingredients = [...constructorItems];
      ingredients.splice(hoverIndex, 0, ingredients.splice(dragIndex, 1)[0]);
      dispatch(moveIngredient(ingredients));
    },
    [dispatch, constructorItems]
  );

  return (
    <section className={clsx(styleConstructor.content, 'pl-4')}>
      <div className={clsx(styleConstructor.wrapper, 'mt-25')}>
        <BunElement />
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
              {constructorItems.map((element, index) => (
                <ConstructorItem
                  key={element.position}
                  constructorIngredient={element}
                  index={index}
                  moveItemHandler={moveItemHandler}
                />
              ))}
            </div>
          </Scrollbars>
        )}
        <BunElement isTop={false} />
      </div>
      <Total />
    </section>
  );
};

export default BurgerConstructor;
