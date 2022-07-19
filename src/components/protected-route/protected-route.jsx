import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { getUser } from '../../services/reducers/profile-reducer';
import Loader from '../loader/loader';

const ProtectedRoute = ({ children, ...rest }) => {
  const { user, isGetUserLoaded } = useSelector((store) => ({
    user: store.profile.user,
    isGetUserLoaded: store.profile.isGetUserLoaded,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isGetUserLoaded) {
    return <Loader />;
  }

  return (
    <Route
      {...rest}
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
