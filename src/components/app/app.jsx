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
import NotFound404 from '../../pages/404/404';
import ProfileOrdersPage from '../../pages/profile-pages/profile-orders-page';
import ProtectedRoute from '../protected-route/protected-route';
import RedirectRoute from '../protected-route/redirect-route';
import IngredientPage from '../../pages/ingredient-page';

const App = () => {
  return (
    <Provider store={store}>
      <Switch>
        <RedirectRoute exact path='/login'>
          <Login />
        </RedirectRoute>
        <RedirectRoute exact path='/register'>
          <Registration />
        </RedirectRoute>
        <RedirectRoute exact path='/forgot-password'>
          <ForgotPassword />
        </RedirectRoute>
        <RedirectRoute exact path='/reset-password'>
          <PasswordReset />
        </RedirectRoute>
        <Route exact path='/'>
          <ConstructorPage />
        </Route>
        <Route exact path='/orders'>
          <OrdersPage />
        </Route>
        <Route exact path='/ingredients/:id'>
          <IngredientPage />
        </Route>
        <ProtectedRoute exact path='/profile'>
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute exact path='/profile/orders'>
          <ProfileOrdersPage />
        </ProtectedRoute>
        <ProtectedRoute exact path='/profile/orders/:id'>
          ingredient
        </ProtectedRoute>
        <Route>
          <NotFound404 />
        </Route>
      </Switch>
    </Provider>
  );
};

export default App;
