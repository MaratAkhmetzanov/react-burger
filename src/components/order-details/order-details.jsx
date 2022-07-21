import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';

import styleOrderDetails from './order-details.module.scss';
import { checkmark } from '../../images/svg.jsx';
import { Redirect, useHistory } from 'react-router-dom';
import { getOrder } from '../../services/middleware/order-middleware';

const OrderDetails = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { orderNumber, createOrderRequest, createOrderFailed, constructorBun, constructorItems } = useSelector(
    (store) => ({
      orderNumber: store.order.orderNumber,
      createOrderRequest: store.order.createOrderRequest,
      createOrderFailed: store.order.createOrderFailed,
      constructorBun: store.burgerConstructor.constructorBun,
      constructorItems: store.burgerConstructor.constructorItems,
    })
  );

  useEffect(() => {
    if (constructorBun && !createOrderRequest) {
      const ingredients = [constructorBun._id, ...constructorItems.map((item) => item._id)];
      dispatch(getOrder(ingredients));
    } else {
      history.replace({ pathname: '/' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (createOrderFailed === 'jwt malformed') {
    return <Redirect push={false} to={'/login'} />;
  }

  return (
    <div className={styleOrderDetails.order_wrapper}>
      {createOrderRequest && (
        <div className={styleOrderDetails.loader}>
          <div className='text text_type_main-medium'>Формируем заказ…</div>
          <div className='text text_type_main-default text_color_inactive mt-2'>Это займет некоторое время</div>
        </div>
      )}
      {!createOrderRequest && (
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
