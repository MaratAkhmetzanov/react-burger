import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { exitUser } from '../../../services/reducers/auth-reducer';
import styleProfileNav from './profile-nav.module.scss';

const ProfileNav = ({ children, className = '' }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const exitHandler = () => {
    dispatch(exitUser(history));
  }

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
        <div className={clsx(styleProfileNav.nav_link, 'text text_type_main-medium')} onClick={exitHandler}>Выход</div>
      </nav>
      <p className={clsx(styleProfileNav.nav_text, 'text text_type_main-default text_color_inactive')}>{children}</p>
    </section>
  );
};

export default ProfileNav;
