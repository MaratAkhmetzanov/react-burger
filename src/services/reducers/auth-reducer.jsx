import { createSlice } from '@reduxjs/toolkit';
import { fetchForgotPassword, fetchLogin, fetchRefreshToken, fetchRegister, fetchResetPassword } from '../../utils/api';
import { saveTokensUtil } from '../../utils/utils';
import { exitUser, setUser } from './profile-reducer';

const initialState = {
  isRegisterRequest: false,
  registerFailedMessage: '',
  isLoginRequest: false,
  isLoginFailed: false,
  isExitRequest: false,
  isExitFailed: false,
  isForgotPasswordRequest: false,
  isForgotPasswordFailed: false,
  isResetPasswordRequest: false,
  isResetPasswordFailed: false,
};

const authReducer = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    registerRequest (state) {
      state.isRegisterRequest = true;
    },
    registerSuccess (state, { payload }) {
      state.isRegisterRequest = false;
      state.registerFailedMessage = '';
    },
    registerFailed (state, { payload }) {
      state.isRegisterRequest = false;
      state.registerFailedMessage = payload;
    },
    loginRequest (state) {
      state.isLoginRequest = true;
    },
    loginSuccess (state) {
      state.isLoginRequest = false;
      state.isLoginFailed = false;
    },
    loginFailed (state) {
      state.isloginRequest = false;
      state.isLoginFailed = true;
    },
    refreshTokenRequest (state) {
      state.isRefreshTokenRequest = true;
    },
    refreshTokenSuccess (state) {
      state.isRefreshTokenRequest = false;
      state.refreshTokenFailedMessage = '';
    },
    refreshTokenFailed (state, { payload }) {
      state.isRefreshTokenRequest = false;
      state.refreshTokenFailedMessage = payload;
    },
    forgotPasswordRequest (state) {
      state.isForgotPasswordRequest = true;
    },
    forgotPasswordSuccess (state) {
      state.isForgotPasswordRequest = false;
      state.isForgotPasswordFailed = false;
    },
    forgotPasswordFailed (state) {
      state.isForgotPasswordRequest = false;
      state.isForgotPasswordFailed = true;
    },
    resetPasswordRequest (state) {
      state.isResetPasswordRequest = true;
    },
    resetPasswordSuccess (state) {
      state.isResetPasswordRequest = false;
      state.isResetPasswordFailed = false;
    },
    resetPasswordFailed (state) {
      state.isResetPasswordRequest = false;
      state.isResetPasswordFailed = true;
    },
  },
});

export const registerUser = (email, password, name) => (dispatch) => {
  dispatch(registerRequest());

  fetchRegister(email, password, name)
    .then((data) => {
      if (data && data.success) {
        saveTokensUtil(data.accessToken, data.refreshToken);
        dispatch(setUser(data.user));
        dispatch(registerSuccess(data.user));
      } else {
        dispatch(registerFailed(data.message));
      }
    })
    .catch((e) => {
      dispatch(registerFailed(e));
    });
};

export const loginUser = (email, password) => (dispatch) => {
  dispatch(loginRequest());

  fetchLogin(email, password)
    .then((data) => {
      if (data && data.success) {
        saveTokensUtil(data.accessToken, data.refreshToken);
        dispatch(setUser(data.user));
        dispatch(loginSuccess(data.user));
      } else {
        dispatch(loginFailed());
      }
    })
    .catch((e) => {
      dispatch(loginFailed());
    });
};

export const refreshToken = (prevAction) => (dispatch) => {
  dispatch(refreshTokenRequest());
  fetchRefreshToken()
    .then((data) => {
      if (data && data.success) {
        saveTokensUtil(data.accessToken, data.refreshToken);
        dispatch(prevAction());
        dispatch(refreshTokenSuccess());
      } else {
        if (data.message === 'Token is invalid') {
          dispatch(exitUser());
        }
        dispatch(refreshTokenFailed(data.message));
      }
    })
    .catch((e) => {
      dispatch(refreshTokenFailed(e));
    });
};

export const forgotPassword = (email, history) => (dispatch) => {
  dispatch(forgotPasswordRequest());

  fetchForgotPassword(email)
    .then((data) => {
      if (data && data.success) {
        dispatch(forgotPasswordSuccess());
        history.push({ pathname: '/reset-password' });
      } else {
        dispatch(forgotPasswordFailed());
      }
    })
    .catch((e) => {
      dispatch(forgotPasswordFailed());
    });
};

export const resetPassword = (password, token) => (dispatch) => {
  dispatch(resetPasswordRequest());

  fetchResetPassword(password, token)
    .then((data) => {
      if (data && data.success) {
        dispatch(forgotPasswordSuccess());
      } else {
        dispatch(forgotPasswordFailed());
      }
    })
    .catch((e) => {
      dispatch(forgotPasswordFailed());
    });
};

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
  exitRequest,
  exitSuccess,
  exitFailed,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailed,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailed,
} = authReducer.actions;

export default authReducer.reducer;
