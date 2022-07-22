import { fetchGetOrder } from '../../utils/api';
import { refreshToken } from './auth-thunk';
import { eraseCunstructor } from '../reducers/constructor-reducer';
import { createOrderRequest, createOrderSuccess, createOrderFailed, eraseOrder } from '../reducers/order-reducer';
import { userUnauthorized } from '../reducers/profile-reducer';

export const getOrder = (ingredients) => (dispatch) => {
  dispatch(createOrderRequest());
  fetchGetOrder(ingredients)
    .then((data) => {
      if (data && data.success) {
        dispatch(
          createOrderSuccess({
            name: data.name,
            orderNumber: data.order.number,
          })
        );
        dispatch(eraseCunstructor());
      } else {
        dispatch(createOrderFailed('Ошибка данных'));
      }
    })
    .catch((err) => {
      if (err.message === 'jwt expired') {
        dispatch(refreshToken(() => getOrder(ingredients)));
      } else if (err.message === 'jwt malformed') {
        dispatch(userUnauthorized());
      } else dispatch(eraseOrder());
      dispatch(createOrderFailed(err.message));
    });
};
