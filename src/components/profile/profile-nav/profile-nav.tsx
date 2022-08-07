import clsx from 'clsx';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { exitUser } from '../../../services/thunk/profile-thunk';
import { TODO_ANY } from '../../../utils/types';
import styleProfileNav from './profile-nav.module.scss';

type TProps = {
  children: React.ReactNode;
  className: string;
};

const ProfileNav: FC<TProps> = ({ children, className = '' }): JSX.Element => {
  const isUserExit = useSelector<TODO_ANY, boolean>((store) => store.profile.isUserExit);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (isUserExit) {
      history.push({ pathname: '/login' });
    }
  }, [isUserExit, history]);

  const exitHandler = () => {
    //@ts-ignore
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
        <div
          className={clsx(styleProfileNav.nav_link, 'text text_type_main-medium')}
          onClick={exitHandler}
        >
          Выход
        </div>
      </nav>
      <p
        className={clsx(
          styleProfileNav.nav_text,
          'text text_type_main-default text_color_inactive'
        )}
      >
        {children}
      </p>
    </section>
  );
};

export default ProfileNav;
