import { History } from 'history';
import {
  fetchForgotPassword,
  fetchLogin,
  fetchRefreshToken,
  fetchRegister,
  fetchResetPassword,
} from '../../utils/api';
import { AppThunk } from '../../utils/types';
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
import { exitUser } from './profile-thunk';

export const registerUser =
  (email: string, password: string, name: string): AppThunk =>
  (dispatch) => {
    dispatch(registerRequest());
    fetchRegister(email, password, name)
      .then((data) => {
        if (data && data.success) {
          saveTokensUtil(data.accessToken, data.refreshToken);
          dispatch(setUser(data.user));
          dispatch(registerSuccess());
        } else {
          dispatch(registerFailed('Ошибка данных'));
        }
      })
      .catch((err) => {
        dispatch(registerFailed(err.message));
      });
  };

export const loginUser =
  (email: string, password: string): AppThunk =>
  (dispatch) => {
    dispatch(loginRequest());

    fetchLogin(email, password)
      .then((data) => {
        if (data && data.success) {
          saveTokensUtil(data.accessToken, data.refreshToken);
          dispatch(setUser(data.user));
          dispatch(loginSuccess());
        } else {
          dispatch(loginFailed('Ошибка данных'));
        }
      })
      .catch((err) => {
        dispatch(loginFailed(err.message));
      });
  };

export const refreshToken =
  (prevAction: () => AppThunk): AppThunk =>
  (dispatch) => {
    dispatch(refreshTokenRequest());
    fetchRefreshToken()
      .then((data) => {
        if (data && data.success) {
          saveTokensUtil(data.accessToken, data.refreshToken);
          dispatch(refreshTokenSuccess());
          dispatch(prevAction());
        } else dispatch(refreshTokenFailed('Ошибка данных'));
      })
      .catch((err) => {
        if (err.message === 'Token is invalid') {
          dispatch(exitUser());
        }
        dispatch(refreshTokenFailed(err.message));
      });
  };

export const forgotPassword =
  (email: string, history: History): AppThunk =>
  (dispatch) => {
    dispatch(forgotPasswordRequest());
    fetchForgotPassword(email)
      .then((data) => {
        if (data && data.success) {
          dispatch(forgotPasswordSuccess());
          history.push({ pathname: '/reset-password' });
        } else {
          dispatch(forgotPasswordFailed('Ошибка данных'));
        }
      })
      .catch((err) => {
        dispatch(forgotPasswordFailed(err.message));
      });
  };

export const resetPassword =
  (password: string, token: string): AppThunk =>
  (dispatch) => {
    dispatch(resetPasswordRequest());

    fetchResetPassword(password, token)
      .then((data) => {
        if (data && data.success) {
          dispatch(resetPasswordSuccess());
        } else {
          dispatch(resetPasswordFailed('Ошибка данных'));
        }
      })
      .catch((err) => {
        dispatch(resetPasswordFailed(err.message));
      });
  };
