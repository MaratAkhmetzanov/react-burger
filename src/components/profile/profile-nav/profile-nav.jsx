import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import styleProfileNav from './profile-nav.module.scss';

const ProfileNav = ({ children, className = '' }) => {
  return (
    <section className={clsx(styleProfileNav.nav_section, className)}>
      <nav className={clsx(styleProfileNav.nav, 'mb-20')}>
        <NavLink
          exact
          activeClassName={styleProfileNav.nav_active}
          to='/profile'
          className={clsx(styleProfileNav.nav_link, 'text text_type_main-medium')}
        >
          Профиль
        </NavLink>
        <NavLink
          exact
          activeClassName={styleProfileNav.nav_active}
          to='/profile/orders'
          className={clsx(styleProfileNav.nav_link, 'text text_type_main-medium')}
        >
          История заказов
        </NavLink>
        <NavLink
          exact
          activeClassName={styleProfileNav.nav_active}
          to='/login'
          className={clsx(styleProfileNav.nav_link, 'text text_type_main-medium')}
        >
          Выход
        </NavLink>
      </nav>
      <p className={clsx(styleProfileNav.nav_text, 'text text_type_main-default text_color_inactive')}>{children}</p>
    </section>
  );
};

export default ProfileNav;
