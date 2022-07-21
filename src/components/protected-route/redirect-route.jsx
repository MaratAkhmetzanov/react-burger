import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { getUser } from '../../services/middleware/profile-middleware';
import Loader from '../loader/loader';

const RedirectRoute = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user, getUserLoaded } = useSelector((store) => ({
    user: store.profile.user,
    getUserLoaded: store.profile.getUserLoaded,
  }));

  const pathName = location.state && location.state.from ? location.state.from.pathname : '/';

  useEffect(() => {
    dispatch(getUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!getUserLoaded) {
    return <Loader />;
  }

  return (
    <Route
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

RedirectRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RedirectRoute;
