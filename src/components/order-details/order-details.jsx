import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';

import styleOrderDetails from './order-details.module.scss';
import { checkmark } from '../../images/svg.jsx';
import { Redirect } from 'react-router-dom';
import { getOrder } from '../../services/reducers/order-reducer';

const OrderDetails = () => {
  const dispatch = useDispatch();

  const { orderNumber, isCreateOrderRequest, isCreateOrderFailed, constructorBun, constructorItems } = useSelector(
    (store) => ({
      orderNumber: store.order.orderNumber,
      isCreateOrderRequest: store.order.isCreateOrderRequest,
      isCreateOrderFailed: store.order.isCreateOrderFailed,
      constructorBun: store.burgerConstructor.constructorBun,
      constructorItems: store.burgerConstructor.constructorItems,
    })
  );

  useEffect(() => {
    const ingredients = [constructorBun._id, ...constructorItems.map((item) => item._id)];
    dispatch(getOrder(ingredients));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isCreateOrderFailed === 'jwt malformed') {
    return <Redirect push={false} to={'/'} />;
  }

  return (
    <div className={styleOrderDetails.order_wrapper}>
      {isCreateOrderRequest && (
        <div className={clsx(styleOrderDetails.loader, 'text text_type_main-medium')}>Формируем заказ…</div>
      )}
      {!isCreateOrderRequest && (
        <>
          <p className={clsx(styleOrderDetails.order_id, 'text text_type_digits-large mt-20')}>{orderNumber}</p>
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
