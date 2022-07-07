import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CurrencyIcon,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import styleTotal from './total.module.scss';
import clsx from 'clsx';

import OrderDetails from '../../order-details/order-details';
import Modal from '../../modal/modal';
import { getOrder } from '../../../services/actions/order-actions';

const Total = () => {
  const { constructorBun, constructorItems } = useSelector((store) => ({
    constructorBun: store.burgerConstructor.constructorBun,
    constructorItems: store.burgerConstructor.constructorItems
  }));

  const totalPrice = useMemo(() => {
    return (constructorBun ? constructorBun.price * 2 : 0) + (constructorItems ? constructorItems.reduce((total, item) => total + item.price, 0) : 0)
  }, [constructorBun, constructorItems]);

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
    <div className={clsx(styleTotal.total, 'pt-6 pr-4')}>
      <div className={clsx(styleTotal.total_price, 'mr-10')}>
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

export default Total;