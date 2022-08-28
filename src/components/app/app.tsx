import React, { FC } from 'react';
import { Switch, Route, useLocation, useHistory, Redirect } from 'react-router-dom';
import { Location } from 'history';
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
import FeedPage from '../../pages/feed-page/feed-page';
import OrderId from '../order-id/order-id';
import ProfileOrderId from '../profile/profile-order-id/profile-order-id';

const App: FC = () => {
  const location = useLocation<{ background: Location }>();
  const background = location.state && location.state.background;
  const history = useHistory();

  const handleCloseModal = (): void => {
    history.goBack();
  };

  return (
    <Provider store={store}>
      <AppWrapper>
        <Switch location={background || location}>
          <RedirectRoute path='/login'>
            <Login />
          </RedirectRoute>
          <RedirectRoute path='/register'>
            <Registration />
          </RedirectRoute>
          <RedirectRoute path='/forgot-password'>
            <ForgotPassword />
          </RedirectRoute>
          <RedirectRoute path='/reset-password'>
            <PasswordReset />
          </RedirectRoute>
          <Route exact path='/'>
            <ConstructorPage />
          </Route>
          <Route exact path='/feed'>
            <FeedPage />
          </Route>
          <Route exact path='/feed/:id'>
            <OrderId />
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
            <ProfileOrderId />
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
          <Route path='/feed/:id'>
            <Modal closeModal={handleCloseModal}>
              <OrderId popup />
            </Modal>
          </Route>
          <Route path='/profile/orders/:id'>
            <Modal closeModal={handleCloseModal}>
              <ProfileOrderId popup />
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
