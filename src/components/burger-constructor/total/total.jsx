import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styleTotal from './total.module.scss';
import clsx from 'clsx';

import { useHistory, useLocation } from 'react-router-dom';

const Total = () => {
  const { constructorBun, constructorItems } = useSelector((store) => ({
    constructorBun: store.burgerConstructor.constructorBun,
    constructorItems: store.burgerConstructor.constructorItems,
  }));

  const totalPrice = useMemo(() => {
    return (
      (constructorBun ? constructorBun.price * 2 : 0) +
      (constructorItems ? constructorItems.reduce((total, item) => total + item.price, 0) : 0)
    );
  }, [constructorBun, constructorItems]);

  const history = useHistory();
  const location = useLocation();

  const makeOrder = () => {
    if (constructorBun) {
      history.push({
        pathname: '/order',
        state: { background: location },
      });
    }
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
    </div>
  );
};

export default Total;
