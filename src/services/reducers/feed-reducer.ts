import { createSlice } from '@reduxjs/toolkit';
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
    wsConnect(state) {
      state.isConnecting = true;
    },
    wsClose(state) {
      state.isConnected = false;
    },
    wsConnectSuccess(state) {
      state.isConnecting = false;
      state.isConnected = true;
    },
    wsConnectClosed(state) {
      state.isConnecting = false;
      state.isConnected = false;
    },
    wsConnectError(state) {
      state.isConnecting = false;
      state.isConnected = false;
    },
    setOrdersHistory(state, { payload }: { payload: TSocketMessage }) {
      state.ordersHistory = [...payload.orders];
      state.total = payload.total;
      state.totalToday = payload.totalToday;
      state.isLoaded = true;
    },
  },
});

export const { wsConnect, wsClose, wsConnectSuccess, wsConnectClosed, wsConnectError, setOrdersHistory } =
  feedReducer.actions;

export default feedReducer.reducer;
