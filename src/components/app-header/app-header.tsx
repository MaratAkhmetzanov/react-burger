import React, { FC } from 'react';
import clsx from 'clsx';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import NavigationLink from './navigation-link';
import styleAppHeader from './app-header.module.scss';

const AppHeader: FC = (): JSX.Element => {
  return (
    <header className={clsx(styleAppHeader.header, 'pt-4 pb-4')}>
      <div className={styleAppHeader.header_wrapper}>
        <div className={styleAppHeader.header_left}>
          <nav className={styleAppHeader.nav}>
            <NavigationLink label='Конструктор' className='mr-2' route='/' icon='BurgerIcon' />
            <NavigationLink label='Лента заказов' route='/feed' icon='ListIcon' />
          </nav>
        </div>
        <Logo />
        <div className={styleAppHeader.header_right}>
          <NavigationLink
            label='Личный кабинет'
            route='/profile'
            icon='ProfileIcon'
            isExact={false}
          />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
