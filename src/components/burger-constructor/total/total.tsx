import React, { FC, useMemo } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styleTotal from './total.module.scss';
import clsx from 'clsx';

import { useHistory, useLocation } from 'react-router-dom';
import { TConstructorItem } from '../../../utils/types';
import { TSButton } from '../../../utils/utils';
import { useSelector } from '../../../utils/hooks';

const Total: FC = (): JSX.Element => {
  const { constructorBun, constructorItems } = useSelector((store) => ({
    constructorBun: store.burgerConstructor.constructorBun,
    constructorItems: store.burgerConstructor.constructorItems,
  }));

  const totalPrice: number = useMemo(() => {
    return (
      (constructorBun ? constructorBun.price * 2 : 0) +
      (constructorItems
        ? constructorItems.reduce((total: number, item: TConstructorItem) => total + item.price, 0)
        : 0)
    );
  }, [constructorBun, constructorItems]);

  const history = useHistory();
  const location = useLocation<Location>();

  const makeOrder = (): void => {
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
      <TSButton type='primary' size='large' onClick={makeOrder}>
        Оформить заказ
      </TSButton>
    </div>
  );
};

export default Total;
