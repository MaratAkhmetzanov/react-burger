import { createSlice } from '@reduxjs/toolkit';

type TState = {
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

type TPayload = {
  payload: string;
};

const initialState: TState = {
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
    registerRequest(state: TState): void {
      state.registerRequest = true;
    },
    registerSuccess(state: TState): void {
      state.registerRequest = false;
      state.registerFailed = '';
    },
    registerFailed(state: TState, { payload }: TPayload): void {
      state.registerRequest = false;
      state.registerFailed = payload;
    },
    loginRequest(state: TState): void {
      state.loginRequest = true;
    },
    loginSuccess(state: TState): void {
      state.loginRequest = false;
      state.loginFailed = '';
    },
    loginFailed(state: TState, { payload }: TPayload): void {
      state.loginRequest = false;
      state.loginFailed = payload;
    },
    refreshTokenRequest(state: TState): void {
      state.refreshTokenRequest = true;
    },
    refreshTokenSuccess(state: TState): void {
      state.refreshTokenRequest = false;
      state.refreshTokenFailed = '';
    },
    refreshTokenFailed(state: TState, { payload }: TPayload): void {
      state.refreshTokenRequest = false;
      state.refreshTokenFailed = payload;
    },
    forgotPasswordRequest(state: TState): void {
      state.forgotPasswordRequest = true;
    },
    forgotPasswordSuccess(state: TState): void {
      state.forgotPasswordRequest = false;
      state.forgotPasswordFailed = '';
    },
    forgotPasswordFailed(state: TState, { payload }: TPayload): void {
      state.forgotPasswordRequest = false;
      state.forgotPasswordFailed = payload;
    },
    resetPasswordRequest(state: TState): void {
      state.resetPasswordRequest = true;
    },
    resetPasswordSuccess(state: TState): void {
      state.resetPasswordRequest = false;
      state.resetPasswordFailed = '';
    },
    resetPasswordFailed(state: TState, { payload }: TPayload): void {
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
