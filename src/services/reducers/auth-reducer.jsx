import { createSlice } from '@reduxjs/toolkit';
import { fetchForgotPassword, fetchLogin, fetchRefreshToken, fetchRegister, fetchResetPassword } from '../../utils/api';
import { saveTokensUtil } from '../../utils/utils';
import { exitUser, setUser } from './profile-reducer';

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
        dispatch(loginFailed(data.message));
      }
    })
    .catch((e) => {
      dispatch(loginFailed(e));
    });
};

export const refreshToken = (prevAction) => (dispatch) => {
  dispatch(refreshTokenRequest());
  fetchRefreshToken()
    .then((data) => {
      if (data && data.success) {
        saveTokensUtil(data.accessToken, data.refreshToken);
        console.log(prevAction)
        dispatch(refreshTokenSuccess());
        dispatch(prevAction());
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
        dispatch(forgotPasswordFailed(data.message));
      }
    })
    .catch((e) => {
      dispatch(forgotPasswordFailed(e));
    });
};

export const resetPassword = (password, token) => (dispatch) => {
  dispatch(resetPasswordRequest());

  fetchResetPassword(password, token)
    .then((data) => {
      if (data && data.success) {
        dispatch(resetPasswordSuccess());
      } else {
        dispatch(resetPasswordFailed(data.message));
      }
    })
    .catch((e) => {
      dispatch(resetPasswordFailed(e));
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
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailed,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailed,
} = authReducer.actions;

export default authReducer.reducer;
