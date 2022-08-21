import React, { FC, useEffect } from 'react';
import clsx from 'clsx';

import styleOrderDetails from './order-details.module.scss';
import { checkmark } from '../../images/svg.jsx';
import { Redirect, useHistory } from 'react-router-dom';
import { getOrder } from '../../services/thunk/order-thunk';
import { useDispatch, useSelector } from '../../utils/hooks';

const OrderDetails: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { orderNumber, createOrderRequest, userUnauthorized, constructorBun, constructorItems } =
    useSelector((store) => ({
      orderNumber: store.order.orderNumber,
      createOrderRequest: store.order.createOrderRequest,
      userUnauthorized: store.profile.userUnauthorized,
      constructorBun: store.burgerConstructor.constructorBun,
      constructorItems: store.burgerConstructor.constructorItems,
    }));

  useEffect(() => {
    if (constructorBun && !createOrderRequest) {
      const ingredients: Array<string> = [
        constructorBun._id,
        ...constructorItems.map((item) => item._id),
      ];
      dispatch(getOrder(ingredients));
    } else {
      history.replace({ pathname: '/' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (userUnauthorized) {
    return <Redirect push={false} to={'/login'} />;
  }

  return (
    <div className={styleOrderDetails.order_wrapper}>
      {createOrderRequest && (
        <div className={styleOrderDetails.loader}>
          <div className='text text_type_main-medium'>Формируем заказ…</div>
          <div className='text text_type_main-default text_color_inactive mt-2'>
            Это займет некоторое время
          </div>
        </div>
      )}
      {!createOrderRequest && (
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
