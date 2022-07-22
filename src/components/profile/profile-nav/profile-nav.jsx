import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { exitUser } from '../../../services/thunk/profile-thunk';
import styleProfileNav from './profile-nav.module.scss';

const ProfileNav = ({ children, className = '' }) => {
  const isUserExit = useSelector((store) => store.profile.isUserExit);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (isUserExit) {
      history.push({ pathname: '/login' });
    }
  }, [isUserExit, history]);

  const exitHandler = () => {
    dispatch(exitUser());
  };

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
        <div className={clsx(styleProfileNav.nav_link, 'text text_type_main-medium')} onClick={exitHandler}>
          Выход
        </div>
      </nav>
      <p className={clsx(styleProfileNav.nav_text, 'text text_type_main-default text_color_inactive')}>{children}</p>
    </section>
  );
};

ProfileNav.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default ProfileNav;
