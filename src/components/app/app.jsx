import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../services/store';

import Login from '../../pages/login';
import Registration from '../../pages/register';
import ConstructorPage from '../../pages/constructor-page';
import OrdersPage from '../../pages/orders-page';
import ProfilePage from '../../pages/profile-pages/profile-page';
import PasswordReset from '../../pages/reset-password';
import ForgotPassword from '../../pages/forgot-password';
import NotFound404 from '../../pages/404';
import ProfileOrdersPage from '../../pages/profile-pages/profile-orders-page';

const App = () => {
  return (
    <Provider store={store}>
      <Switch>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/register'>
          <Registration />
        </Route>
        <Route exact path='/forgot-password'>
          <ForgotPassword />
        </Route>
        <Route exact path='/reset-password'>
          <PasswordReset />
        </Route>
        <Route exact path='/ingredients/:id'>
          ingredient
        </Route>
        <Route exact path='/'>
          <ConstructorPage />
        </Route>
        <Route exact path='/orders'>
          <OrdersPage />
        </Route>
        <Route exact path='/profile'>
          <ProfilePage />
        </Route>
        <Route exact path='/profile/orders'>
          <ProfileOrdersPage />
        </Route>
        <Route>
          <NotFound404 />
        </Route>
      </Switch>
    </Provider>
  );
};

export default App;
