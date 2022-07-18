import React from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

import styleOrderDetails from './order-details.module.scss';
import { checkmark } from '../../images/svg.jsx';

const OrderDetails = () => {
  const { orderNumber, isCreateOrderRequest } = useSelector((store) => ({
    orderNumber: store.order.orderNumber,
    isCreateOrderRequest: store.order.isCreateOrderRequest
  }));

  return (
    <div className={styleOrderDetails.order_wrapper}>
      {isCreateOrderRequest && (
        <div className={clsx(styleOrderDetails.loader, 'text text_type_main-medium')}>
          Формируем заказ…
        </div>
      )}
      {!isCreateOrderRequest && (
        <>
          <p className={clsx(styleOrderDetails.order_id, 'text text_type_digits-large mt-20')}>
            {orderNumber}
          </p>
          <p className='text text_type_main-medium mt-8 mb-15'>идентификатор заказа</p>
          {checkmark}
          <p className='text text_type_main-default mt-15'>Ваш заказ начали готовить</p>
          <p className='text text_type_main-default text_color_inactive mt-2 mb-20'>
            Дождитесь готовности на орбитальной станции
          </p>
        </>
      )}
    </div>
  );
};

export default OrderDetails;
