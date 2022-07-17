import { createSlice } from '@reduxjs/toolkit';
import { GET_DATA_URL } from '../../utils/constants';
import { eraseCunstructor } from './constructor-reducer';

const initialState = {
  name: '',
  orderNumber: 0,
  createOrderRequest: false,
  createOrderFailed: false,
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
      state.createOrderFailed = false;
    },
    createOrderFailed(state) {
      state.createOrderRequest = false;
      state.createOrderFailed = true;
    },
    eraseOrder(state) {
      state.name = '';
      state.orderNumber = 0;
    },
  },
});

export function getOrder(ingredients) {
  return function (dispatch) {
    dispatch(createOrderRequest());
    fetch(`${GET_DATA_URL}/orders`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingredients }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else Promise.reject(`Ошибка ${res.status}`);
      })
      .then((res) => {
        if (res && res.success) {
          dispatch(eraseCunstructor());
          dispatch(
            createOrderSuccess({
              name: res.name,
              orderNumber: res.order.number,
            })
          );
        } else {
          dispatch(createOrderFailed());
          dispatch(eraseOrder());
        }
      })
      .catch((e) => {
        dispatch(createOrderFailed());
        dispatch(eraseOrder());
      });
  };
}

export const { createOrderRequest, createOrderSuccess, createOrderFailed, eraseOrder } = orderReducer.actions;

export default orderReducer.reducer;
