import React from 'react';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styleAppHeader from './app-header.module.scss';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

const NavigationLink = ({ label, route, className = '', icon = null, isExact = true }) => {

  return (
    <NavLink
      exact={isExact}
      to={route}
      activeClassName={styleAppHeader.active}
      className={clsx(styleAppHeader.nav_button, className, 'pt-4 pb-4 pr-5 pl-5')}
    >
      {icon === 'BurgerIcon' && <BurgerIcon />}
      {icon === 'ListIcon' && <ListIcon />}
      {icon === 'ProfileIcon' && <ProfileIcon />}
      <span className='text text_type_main-default ml-2'>{label}</span>
    </NavLink>
  );
};

const AppHeader = () => {
  return (
    <header className={clsx(styleAppHeader.header, 'pt-4 pb-4')}>
      <div className={styleAppHeader.header_wrapper}>
        <div className={styleAppHeader.header_left}>
          <nav className={styleAppHeader.nav}>
            <NavigationLink label='Конструктор' className='mr-2' route='/' icon='BurgerIcon' />
            <NavigationLink label='Лента заказов' route='/orders' icon='ListIcon' />
          </nav>
        </div>
        <Logo />
        <div className={styleAppHeader.header_right}>
          <NavigationLink label='Личный кабинет' route='/profile' icon='ProfileIcon' isExact={false} />
        </div>
      </div>
    </header>
  );
};

NavigationLink.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
};

export default AppHeader;
