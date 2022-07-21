import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { getUser } from '../../services/middleware/profile-middleware';
import Loader from '../loader/loader';

const ProtectedRoute = ({ children }) => {
  const { user, getUserLoaded } = useSelector((store) => ({
    user: store.profile.user,
    getUserLoaded: store.profile.getUserLoaded,
  }));

  const dispatch = useDispatch();

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

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
