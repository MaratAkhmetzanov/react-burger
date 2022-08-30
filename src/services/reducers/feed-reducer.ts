import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder, TSocketMessage } from '../../utils/types';

type TFeedState = {
  isConnecting: boolean;
  isConnected: boolean;
  isLoaded: boolean;
  ordersHistory: Array<TOrder>;
  total: number;
  totalToday: number;
};

const initialState: TFeedState = {
  isConnecting: false,
  isConnected: false,
  isLoaded: false,
  ordersHistory: [],
  total: 0,
  totalToday: 0,
};

const feedReducer = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    wsConnect(state, { payload }: PayloadAction<string>) {
      state.isConnecting = true;
    },
    wsClose(state) {
      state.isConnecting = false;
      state.isLoaded = false;
      state.isConnected = false;
      state.ordersHistory = []; 
    },
    wsConnectSuccess(state) {
      state.isConnecting = false;
      state.isConnected = true;
    },
    wsConnectClosed(state) {
      state.isConnecting = false;
      state.isLoaded = false;
      state.isConnected = false;
      state.ordersHistory = [];
    },
    wsConnectError(state) {
      state.isConnecting = false;
      state.isConnected = false;
      state.ordersHistory = [];
    },
    setOrdersHistory(state, { payload }: PayloadAction<TSocketMessage>) {
      state.ordersHistory = [...payload.orders];
      state.total = payload.total;
      state.totalToday = payload.totalToday;
      state.isLoaded = true;
      state.isConnected = true;
    },
  },
});

export const {
  wsConnect,
  wsClose,
  wsConnectSuccess,
  wsConnectClosed,
  wsConnectError,
  setOrdersHistory,
} = feedReducer.actions;

export const wsActions = {
  wsConnect,
  wsClose,
  wsConnectSuccess,
  wsConnectClosed,
  wsConnectError,
  setOrdersHistory,
};

export type TWsActions = {
  wsConnect: typeof wsConnect,
  wsClose: typeof wsClose,
  wsConnectSuccess: typeof wsConnectSuccess,
  wsConnectClosed: typeof wsConnectClosed,
  wsConnectError: typeof wsConnectError,
  setOrdersHistory: typeof setOrdersHistory,
};

export default feedReducer.reducer;
