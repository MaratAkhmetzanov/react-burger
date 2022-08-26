import { FC, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { getUser } from '../../services/thunk/profile-thunk';
import Loader from '../loader/loader';
import { useDispatch, useSelector } from '../../utils/hooks';

type TProps = {
  children: React.ReactNode;
  path: string;
  exact?: boolean;
};

const ProtectedRoute: FC<TProps> = ({ exact = false, children, ...rest }): JSX.Element => {
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
      exact
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
