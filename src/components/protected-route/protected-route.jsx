import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { getUser } from "../../services/reducers/profile-reducer";

const ProtectedRoute = ({ children, ...rest }) => {
  const { user, isGetUserRequest } = useSelector(store => ({
    user: store.profile.user,
    isGetUserRequest: store.profile.isGetUserRequest
  }));

  useEffect(() => {
    getUser();
  }, []);

  if (isGetUserRequest) {
    return null;
  }

  return <Route {...rest} render={({ location }) => user
    ? children :
    <Redirect
      to={{
        pathname: '/login',
        state: { from: location }
      }}
    />} />;
};

export default ProtectedRoute;
