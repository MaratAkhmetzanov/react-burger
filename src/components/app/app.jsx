import React from 'react';
import { Switch, Route, useLocation, useHistory, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../services/store';

import Login from '../../pages/login';
import Registration from '../../pages/register';
import ConstructorPage from '../../pages/constructor-page';
import ProfilePage from '../../pages/profile-pages/profile-page';
import PasswordReset from '../../pages/reset-password';
import ForgotPassword from '../../pages/forgot-password';
import NotFound404 from '../../pages/404/404';
import ProfileOrdersPage from '../../pages/profile-pages/profile-orders-page';
import ProtectedRoute from '../protected-route/protected-route';
import RedirectRoute from '../protected-route/redirect-route';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import AppWrapper from '../app-wrapper/app-wrapper';

const App = () => {
  const location = useLocation();
  const background = location.state && location.state.background;
  const history = useHistory();

  const handleCloseModal = () => {
    history.goBack();
  };

  return (
    <Provider store={store}>
      <AppWrapper>
        <Switch location={background || location}>
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
      <p className='text text_type_main-medium mt-20'>Смотрите в следующих сериях…</p>
          </Route>
          <Route exact path='/order'>
            <Redirect to='/' />
          </Route>
          <Route exact path='/ingredients/:id'>
            <IngredientDetails />
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
      </AppWrapper>
      {background && (
        <>
          <Route path='/ingredients/:id'>
            <Modal closeModal={handleCloseModal}>
              <IngredientDetails />
            </Modal>
          </Route>
          <Route path='/order'>
            <Modal closeModal={handleCloseModal}>
              <OrderDetails />
            </Modal>
          </Route>
        </>
      )}
    </Provider>
  );
};

export default App;
