import { createSlice } from '@reduxjs/toolkit';
import { TOrder, TSocketMessage, TUser } from '../../utils/types';

type TProfileState = {
  user: TUser | null;
  getUserRequest: boolean;
  getUserLoaded: boolean;
  getUserFailed: string;
  exitRequest: boolean;
  exitFailed: string;
  userUnauthorized: boolean;
  wsProfileConnecting: boolean;
  wsProfileConnected: boolean;
  ordersHistory: Array<TOrder>;
};

const initialState: TProfileState = {
  user: null,
  getUserRequest: false,
  getUserLoaded: false,
  getUserFailed: '',
  exitRequest: false,
  exitFailed: '',
  userUnauthorized: false,
  wsProfileConnecting: false,
  wsProfileConnected: false,
  ordersHistory: [],
};

const profileReducer = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUser(state, { payload }: { payload: TUser }) {
      state.user = { ...payload };
      state.userUnauthorized = false;
      state.exitFailed = '';
    },
    getUserRequest(state) {
      state.getUserRequest = true;
    },
    getUserSuccess(state, { payload }: { payload: TUser }) {
      state.user = { ...payload };
      state.userUnauthorized = false;
      state.getUserRequest = false;
      state.getUserLoaded = true;
      state.getUserFailed = '';
    },
    getUserFailed(state, { payload }: { payload: string }) {
      state.getUserRequest = false;
      state.getUserLoaded = true;
      state.getUserFailed = payload;
    },
    exitRequest(state) {
      state.exitRequest = true;
      state.getUserLoaded = true;
    },
    exitSuccess(state) {
      state.user = null;
      state.exitRequest = false;
      state.userUnauthorized = true;
    },
    exitFailed(state, { payload }: { payload: string }) {
      state.exitRequest = false;
      state.exitFailed = payload;
    },
    userUnauthorized(state) {
      state.userUnauthorized = true;
    },
    wsProfileConnect(state) {
      state.wsProfileConnecting = true;
    },
    wsProfileClose(state) {
      state.wsProfileConnected = false;
    },
    wsProfileConnectSuccess(state) {
      state.wsProfileConnecting = false;
      state.wsProfileConnected = true;
    },
    wsProfileConnectClosed(state) {
      state.wsProfileConnecting = false;
      state.wsProfileConnected = false;
    },
    wsProfileConnectError(state) {
      state.wsProfileConnecting = false;
      state.wsProfileConnected = false;
    },
    setProfileOrders(state, { payload }: { payload: TSocketMessage }) {
      state.ordersHistory = [...payload.orders].reverse();
      state.wsProfileConnected = true;
    },  
  },
});

export const {
  setUser,
  getUserRequest,
  getUserSuccess,
  getUserFailed,
  exitRequest,
  exitSuccess,
  exitFailed,
  userUnauthorized,
  wsProfileConnect,
  wsProfileClose,
  wsProfileConnectSuccess,
  wsProfileConnectClosed,
  wsProfileConnectError,
  setProfileOrders,
} = profileReducer.actions;

export default profileReducer.reducer;
