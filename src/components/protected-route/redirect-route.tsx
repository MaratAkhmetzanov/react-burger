import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { getUser } from '../../services/thunk/profile-thunk';
import { TODO_ANY, TUser } from '../../utils/types';
import Loader from '../loader/loader';

type TProps = {
  children: React.ReactNode;
  path: string;
};

type TStore = { user: null|TUser; getUserLoaded: boolean };

const RedirectRoute: FC<TProps> = ({ children }): JSX.Element => {
  const { user, getUserLoaded } = useSelector<TODO_ANY, TStore>((store) => ({
    user: store.profile.user,
    getUserLoaded: store.profile.getUserLoaded,
  }));
  
  const dispatch = useDispatch();
  const location = useLocation<{ from: { pathname: string } }>();

  const pathName = location.state && location.state.from ? location.state.from.pathname : '/';

  useEffect(() => {
    //@ts-ignore
    dispatch(getUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!getUserLoaded) {
    return <Loader />;
  }

  return (
    <Route
      exact
      render={({ location }) =>
        !user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: pathName,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default RedirectRoute;
