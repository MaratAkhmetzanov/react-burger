import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
  DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import styleConstructor from './burger-constructor.module.scss';
import { Scrollbars } from 'react-custom-scrollbars';
import clsx from 'clsx';
import { v4 as uuidv4 } from 'uuid';

import { addIngredient } from '../../services/actions/constructor-actions';

import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';

const Total = React.memo(() => {
  const totalPrice = useSelector((store) =>
    (store.constructor.constructorBun
      ? store.constructor.constructorBun.price * 2
      : 0) +
    (store.constructor.constructorItems
      ? store.constructor.constructorItems.reduce((total, item) => total + item.price, 0)
      : 0)
  );

  const [modalVisibility, setModalVisibility] = useState(false);

  const handleOpenModal = () => {
    setModalVisibility(true);
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
      <Button type='primary' size='large' onClick={handleOpenModal}>
        Оформить заказ
      </Button>
      {modalVisibility && (
        <Modal closeModal={handleCloseModal}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
});

const BurgerConstructor = () => {
  const { constructorBun, constructorItems } = useSelector((store) => ({
    constructorBun: store.constructor.constructorBun,
    constructorItems: store.constructor.constructorItems
  }));

  const dispatch = useDispatch();

  const [{ bunDropHover }, bunDropTarget] = useDrop({
    accept: 'bun',
    collect: monitor => ({
      bunDropHover: monitor.isOver()
    }),
    drop (item) {
      dispatch(addIngredient(item));
    }
  });

  const [{ ingredientbunDropHover }, ingredientDropTarget] = useDrop({
    accept: 'ingredient',
    collect: monitor => ({
      ingredientbunDropHover: monitor.isOver()
    }),
    drop (item) {
      dispatch(addIngredient(item));
    }
  });

  return (
    <section className={clsx(styleConstructor.content, 'pl-4')}>
      <div className={clsx(styleConstructor.wrapper, 'mt-25')}>
        <div className={clsx('ml-8 mr-4', bunDropHover ? styleConstructor.dropzone_hover : styleConstructor.dropzone)} ref={bunDropTarget}>
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

        {!constructorItems && (
          <div className='ml-8 mr-4' ref={ingredientDropTarget}>
            <div className={styleConstructor.empty_ingredients}>Добавьте ингредиент</div>
          </div>
        )}
        {constructorItems && (
          <Scrollbars
            autoHeight={true}
            thumbMinSize={120}
            autoHeightMin={window.innerHeight - 536}
            renderTrackVertical={(props) => <div className={styleConstructor.track_vertical} />}
            renderThumbVertical={(props) => <div className={styleConstructor.thumb_vertical} />}
          >
            <div className={clsx(styleConstructor.catalog, 'pr-4')} ref={ingredientDropTarget}>
              {constructorItems.map((ingretient) => (
                <div className={styleConstructor.drag_element} key={uuidv4()}>
                  <DragIcon type='primary' />
                  <ConstructorElement
                    text={ingretient.name}
                    price={ingretient.price}
                    thumbnail={ingretient.image}
                  />
                </div>
              ))}
            </div>
          </Scrollbars>
        )}
        <div className='pl-8 pr-4'>
          {constructorBun && (
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
