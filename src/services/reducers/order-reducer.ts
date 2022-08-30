import { createSlice } from '@reduxjs/toolkit';

type TOrderState = {
  name: string;
  orderNumber: number;
  createOrderRequest: boolean;
  createOrderFailed: string;
};

const initialState: TOrderState = {
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
      state.createOrderFailed = '';
    },
    createOrderSuccess(state, { payload }: { payload: { name: string; orderNumber: number } }) {
      state.name = payload.name;
      state.orderNumber = payload.orderNumber;
      state.createOrderRequest = false;
      state.createOrderFailed = '';
    },
    createOrderFailed(state, { payload }: { payload: string }) {
      state.createOrderRequest = false;
      state.createOrderFailed = payload;
    },
    eraseOrder(state) {
      state.name = '';
      state.orderNumber = 0;
    },
  },
});

export const { createOrderRequest, createOrderSuccess, createOrderFailed, eraseOrder } =
  orderReducer.actions;

export default orderReducer.reducer;
