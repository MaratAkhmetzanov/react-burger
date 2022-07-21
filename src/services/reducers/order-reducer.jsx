import { createSlice } from '@reduxjs/toolkit';
import { fetchGetOrder } from '../../utils/api';
import { refreshToken } from './auth-reducer';
import { eraseCunstructor } from './constructor-reducer';

const initialState = {
  name: '',
  orderNumber: 0,
  createOrderRequest: false,
  createOrderFailed: '',
};

const orderReducer = createSlice({
  name: 'order',
  initialState,
  reducers: {
    createOrderRequest(state) {
      state.createOrderRequest = true;
    },
    createOrderSuccess(state, { payload }) {
      state.name = payload.name;
      state.orderNumber = payload.orderNumber;
      state.createOrderRequest = false;
      state.createOrderFailed = '';
    },
    createOrderFailed(state, { payload }) {
      state.createOrderRequest = false;
      state.createOrderFailed = payload;
    },
    eraseOrder(state) {
      state.name = '';
      state.orderNumber = 0;
    },
  },
});

export const getOrder = (ingredients) => (dispatch) => {
  dispatch(createOrderRequest());
  fetchGetOrder(ingredients)
    .then((data) => {
      if (data && data.success) {
        dispatch(eraseCunstructor());
        dispatch(
          createOrderSuccess({
            name: data.name,
            orderNumber: data.order.number,
          })
        );
      } else {
        if (data.message === 'jwt expired') {
          dispatch(refreshToken(() => getOrder(ingredients)));
        }
        dispatch(createOrderFailed(data.message));
      }
    })
    .catch((e) => {
      dispatch(createOrderFailed());
      dispatch(eraseOrder());
    });
};

export const { createOrderRequest, createOrderSuccess, createOrderFailed, eraseOrder } = orderReducer.actions;

export default orderReducer.reducer;
