import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  registerRequest: false,
  registerFailed: '',
  loginRequest: false,
  loginFailed: '',
  refreshTokenRequest: false,
  refreshTokenFailed: '',
  forgotPasswordRequest: false,
  forgotPasswordFailed: false,
  resetPasswordRequest: false,
  resetPasswordFailed: '',
};

const authReducer = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    registerRequest (state) {
      state.registerRequest = true;
    },
    registerSuccess (state, { payload }) {
      state.registerRequest = false;
      state.registerFailed = '';
    },
    registerFailed (state, { payload }) {
      state.registerRequest = false;
      state.registerFailed = payload;
    },
    loginRequest (state) {
      state.loginRequest = true;
    },
    loginSuccess (state) {
      state.loginRequest = false;
      state.loginFailed = false;
    },
    loginFailed (state, { payload }) {
      state.loginRequest = false;
      state.loginFailed = payload;
    },
    refreshTokenRequest (state) {
      state.refreshTokenRequest = true;
    },
    refreshTokenSuccess (state) {
      state.refreshTokenRequest = false;
      state.refreshTokenFailed = '';
    },
    refreshTokenFailed (state, { payload }) {
      state.refreshTokenRequest = false;
      state.refreshTokenFailed = payload;
    },
    forgotPasswordRequest (state) {
      state.forgotPasswordRequest = true;
    },
    forgotPasswordSuccess (state) {
      state.forgotPasswordRequest = false;
      state.forgotPasswordFailed = false;
    },
    forgotPasswordFailed (state, { payload }) {
      state.forgotPasswordRequest = false;
      state.forgotPasswordFailed = payload;
    },
    resetPasswordRequest (state) {
      state.resetPasswordRequest = true;
    },
    resetPasswordSuccess (state) {
      state.resetPasswordRequest = false;
      state.resetPasswordFailed = '';
    },
    resetPasswordFailed (state, { payload }) {
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
