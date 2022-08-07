import React, { FC } from 'react';
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styleAppHeader from './app-header.module.scss';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

type TProps = {
  label: string;
  route: string;
  icon?: string;
  className?: string;
  isExact?: boolean;
};

const NavigationLink: FC<TProps> = ({
  label,
  route,
  icon = '',
  className = '',
  isExact = true,
}): JSX.Element => {
  return (
    <NavLink
      exact={true}
      to={route}
      activeClassName={styleAppHeader.active}
      className={clsx(styleAppHeader.nav_button, className, 'pt-4 pb-4 pr-5 pl-5')}
    >
      {icon === 'BurgerIcon' && <BurgerIcon type='secondary' />}
      {icon === 'ListIcon' && <ListIcon type='secondary' />}
      {icon === 'ProfileIcon' && <ProfileIcon type='secondary' />}
      <span className='text text_type_main-default ml-2'>{label}</span>
    </NavLink>
  );
};

export default NavigationLink;
