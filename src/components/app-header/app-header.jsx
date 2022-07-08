import React from 'react';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import styleAppHeader from './app-header.module.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const NavigationLink = ({ className, label, children }) => {
  return (
    <a href='/' className={classNames(styleAppHeader.nav_button, className, 'pt-4 pb-4 pr-5 pl-5')}>
      {children}
      <span className='text text_type_main-default ml-2'>{label}</span>
    </a>
  );
};

const AppHeader = () => {
  return (
    <header className={classNames(styleAppHeader.header, 'pt-4 pb-4')}>
      <div className={styleAppHeader.header_wrapper}>
        <div className={styleAppHeader.header_left}>
          <nav className={styleAppHeader.nav}>
            <NavigationLink
              label='Конструктор'
              className={classNames(styleAppHeader.nav_button_active, 'mr-2')}
            >
              <BurgerIcon type='primary' />
            </NavigationLink>
            <NavigationLink label='Лента заказов' className={styleAppHeader.nav_button_inactive}>
              <ListIcon type='secondary' />
            </NavigationLink>
          </nav>
        </div>
        <Logo className={styleAppHeader.logo} />
        <div className={styleAppHeader.header_right}>
          <NavigationLink label='Личный кабинет' className={styleAppHeader.nav_button_inactive}>
            <ProfileIcon type='secondary' />
          </NavigationLink>
        </div>
      </div>
    </header>
  );
};

NavigationLink.propTypes = {
  className: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
};

export default AppHeader;
