import { fetchForgotPassword, fetchLogin, fetchRefreshToken, fetchRegister, fetchResetPassword } from '../../utils/api';
import { saveTokensUtil } from '../../utils/utils';
import {
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
} from '../reducers/auth-reducer';
import { setUser } from '../reducers/profile-reducer';
import { exitUser } from './profile-middleware';

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
