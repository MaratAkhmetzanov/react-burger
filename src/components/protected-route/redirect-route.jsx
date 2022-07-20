import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { getUser } from '../../services/reducers/profile-reducer';
import Loader from '../loader/loader';

const RedirectRoute = ({ children, ...rest }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user, isGetUserLoaded } = useSelector((store) => ({
    user: store.profile.user,
    isGetUserLoaded: store.profile.isGetUserLoaded,
  }));

  const pathName = (location.state && location.state.from) ? location.state.from.pathname : '/';


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
