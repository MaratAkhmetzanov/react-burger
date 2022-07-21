import { fetchGetOrder } from '../../utils/api';
import { refreshToken } from './auth-middleware';
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
        if (data.message === 'jwt expired') {
          dispatch(refreshToken(() => getOrder(ingredients)));
        }
        if (data.message === 'jwt malformed') {
          dispatch(userUnauthorized());
        }
        dispatch(createOrderFailed(data.message));
      }
    })
    .catch((e) => {
      dispatch(createOrderFailed());
      dispatch(eraseOrder());
    });
};
