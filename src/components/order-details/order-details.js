import React from 'react';
import clsx from 'clsx';

import styleOrderDetails from './order-details.module.scss';
import checkmark from '../../images/checkmark.svg';

const OrderDetails = () => {
  return (
    <div className={styleOrderDetails.order_wrapper}>
      <p className={clsx(styleOrderDetails.order_id, 'text text_type_digits-large mt-20')}>034536</p>
      <p className='text text_type_main-medium mt-8'>
        идентификатор заказа
      </p>
      <img src={checkmark} alt='checkmark' className={clsx(styleOrderDetails.checkmark, 'mt-15')} />
      <p className='text text_type_main-default mt-15'>
        Ваш заказ начали готовить
      </p>
      <p className='text text_type_main-default text_color_inactive mt-2 mb-20'>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  )
}

export default OrderDetails;