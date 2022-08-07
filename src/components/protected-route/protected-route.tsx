import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { getUser } from '../../services/thunk/profile-thunk';
import Loader from '../loader/loader';
import { TODO_ANY, TUser } from '../../utils/types';

type TProps = {
  children: React.ReactNode;
  path: string;
};

type TStore = { user: null|TUser; getUserLoaded: boolean };

const ProtectedRoute: FC<TProps> = ({ children }): JSX.Element => {
  const { user, getUserLoaded } = useSelector<TODO_ANY, TStore>((store) => ({
    user: store.profile.user,
    getUserLoaded: store.profile.getUserLoaded,
  }));

  const dispatch = useDispatch();

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
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
