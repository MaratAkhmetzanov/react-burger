import { createSlice } from '@reduxjs/toolkit';

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
    createOrderRequest (state) {
      state.createOrderRequest = true;
      state.createOrderFailed = '';
    },
    createOrderSuccess (state, { payload }) {
      state.name = payload.name;
      state.orderNumber = payload.orderNumber;
      state.createOrderRequest = false;
      state.createOrderFailed = '';
    },
    createOrderFailed (state, { payload }) {
      state.createOrderRequest = false;
      state.createOrderFailed = payload;
    },
    eraseOrder (state) {
      state.name = '';
      state.orderNumber = 0;
    },
  },
});

export const { createOrderRequest, createOrderSuccess, createOrderFailed, eraseOrder } = orderReducer.actions;

export default orderReducer.reducer;
