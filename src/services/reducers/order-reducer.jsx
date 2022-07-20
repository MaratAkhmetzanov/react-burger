import { createSlice } from '@reduxjs/toolkit';
import { fetchGetOrder } from '../../utils/api';
import { refreshToken } from './auth-reducer';
import { eraseCunstructor } from './constructor-reducer';

const initialState = {
  name: '',
  orderNumber: 0,
  isCreateOrderRequest: false,
  isCreateOrderFailed: '',
};

const orderReducer = createSlice({
  name: 'order',
  initialState,
  reducers: {
    createOrderRequest (state) {
      state.isCreateOrderRequest = true;
    },
    createOrderSuccess (state, { payload }) {
      state.name = payload.name;
      state.orderNumber = payload.orderNumber;
      state.isCreateOrderRequest = false;
      state.isCreateOrderFailed = '';
    },
    createOrderFailed (state, { payload }) {
      state.isCreateOrderRequest = false;
      state.isCreateOrderFailed = payload;
    },
    eraseOrder (state) {
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
        } else dispatch(createOrderFailed(data.message));
      }
    })
    .catch((e) => {
      dispatch(createOrderFailed());
      dispatch(eraseOrder());
    });
};

export const { createOrderRequest, createOrderSuccess, createOrderFailed, eraseOrder } = orderReducer.actions;

export default orderReducer.reducer;
