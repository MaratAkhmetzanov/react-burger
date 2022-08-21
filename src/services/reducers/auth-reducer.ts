import { createSlice } from '@reduxjs/toolkit';

type TAuthState = {
  registerRequest: boolean;
  registerFailed: string;
  loginRequest: boolean;
  loginFailed: string;
  refreshTokenRequest: boolean;
  refreshTokenFailed: string;
  forgotPasswordRequest: boolean;
  forgotPasswordFailed: string;
  resetPasswordRequest: boolean;
  resetPasswordFailed: string;
};

const initialState: TAuthState = {
  registerRequest: false,
  registerFailed: '',
  loginRequest: false,
  loginFailed: '',
  refreshTokenRequest: false,
  refreshTokenFailed: '',
  forgotPasswordRequest: false,
  forgotPasswordFailed: '',
  resetPasswordRequest: false,
  resetPasswordFailed: '',
};

const authReducer = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    registerRequest(state) {
      state.registerRequest = true;
    },
    registerSuccess(state) {
      state.registerRequest = false;
      state.registerFailed = '';
    },
    registerFailed(state, { payload }: { payload: string }) {
      state.registerRequest = false;
      state.registerFailed = payload;
    },
    loginRequest(state) {
      state.loginRequest = true;
    },
    loginSuccess(state) {
      state.loginRequest = false;
      state.loginFailed = '';
    },
    loginFailed(state, { payload }: { payload: string }) {
      state.loginRequest = false;
      state.loginFailed = payload;
    },
    refreshTokenRequest(state) {
      state.refreshTokenRequest = true;
    },
    refreshTokenSuccess(state) {
      state.refreshTokenRequest = false;
      state.refreshTokenFailed = '';
    },
    refreshTokenFailed(state, { payload }: { payload: string }) {
      state.refreshTokenRequest = false;
      state.refreshTokenFailed = payload;
    },
    forgotPasswordRequest(state) {
      state.forgotPasswordRequest = true;
    },
    forgotPasswordSuccess(state) {
      state.forgotPasswordRequest = false;
      state.forgotPasswordFailed = '';
    },
    forgotPasswordFailed(state, { payload }: { payload: string }) {
      state.forgotPasswordRequest = false;
      state.forgotPasswordFailed = payload;
    },
    resetPasswordRequest(state) {
      state.resetPasswordRequest = true;
    },
    resetPasswordSuccess(state) {
      state.resetPasswordRequest = false;
      state.resetPasswordFailed = '';
    },
    resetPasswordFailed(state, { payload }: { payload: string }) {
      state.resetPasswordRequest = false;
      state.resetPasswordFailed = payload;
    },
  },
});

export const {
  registerRequest,
  registerSuccess,
  registerFailed,
  loginRequest,
  loginSuccess,
  loginFailed,
  refreshTokenRequest,
  refreshTokenSuccess,
  refreshTokenFailed,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailed,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailed,
} = authReducer.actions;

export default authReducer.reducer;
