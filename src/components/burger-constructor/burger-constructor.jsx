import React, { useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop, useDrag } from 'react-dnd';
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
  DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import styleConstructor from './burger-constructor.module.scss';
import { Scrollbars } from 'react-custom-scrollbars';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import {
  addIngredient,
  DELETE_INGREDIENT,
  MOVE_INGREDIENT
} from '../../services/actions/constructor-actions';

import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import { getOrder } from '../../services/actions/order-actions';
import dataIngredientsType from '../../utils/types';

const Total = () => {
  const totalPrice = useSelector(
    (store) =>
      (store.burgerConstructor.constructorBun
        ? store.burgerConstructor.constructorBun.price * 2
        : 0) +
      (store.burgerConstructor.constructorItems
        ? store.burgerConstructor.constructorItems.reduce((total, item) => total + item.price, 0)
        : 0)
  );

  const { constructorBun, constructorItems } = useSelector((store) => ({
    constructorBun: store.burgerConstructor.constructorBun,
    constructorItems: store.burgerConstructor.constructorItems
  }));

  const [modalVisibility, setModalVisibility] = useState(false);

  const dispatch = useDispatch();

  const makeOrder = () => {
    if (constructorBun) {
      setModalVisibility(true);
      const ingredients = [constructorBun._id, ...constructorItems.map((item) => item._id)];
      dispatch(getOrder(ingredients));
    }
  };

  const handleCloseModal = () => {
    setModalVisibility(false);
  };

  return (
    <div className={clsx(styleConstructor.total, 'pt-6 pr-4')}>
      <div className={clsx(styleConstructor.total_price, 'mr-10')}>
        <span className='text text_type_digits-medium mr-2'>{totalPrice}</span>
        <CurrencyIcon type='primary' />
      </div>
      <Button type='primary' size='large' onClick={makeOrder}>
        Оформить заказ
      </Button>
      {modalVisibility && (
        <Modal closeModal={handleCloseModal}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
};

const ConstructorItem = ({ ingredient, index, moveItem }) => {
  const { position } = ingredient;

  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: 'constructorItem',
    collect (monitor) {
      return {
        handlerId: monitor.getHandlerId()
      };
    },
    hover (item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'constructorItem',
    item: () => {
      return { position, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  drag(drop(ref));

  const deleteIngredient = (position) => {
    dispatch({
      type: DELETE_INGREDIENT,
      position
    });
  };

  const dispatch = useDispatch();

  return (
    <div
      className={clsx(styleConstructor.drag_element, isDragging ? styleConstructor.hide : '')}
      ref={ref}
      data-handler-id={handlerId}
    >
      <div className={styleConstructor.drag_icon}>
        <DragIcon type='primary' />
      </div>
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => deleteIngredient(ingredient.position)}
      />
    </div>
  );
};

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

ConstructorItem.propTypes = {
  ingredient: dataIngredientsType.isRequired,
  index: PropTypes.number.isRequired,
  moveItem: PropTypes.func.isRequired
};

export default BurgerConstructor;
