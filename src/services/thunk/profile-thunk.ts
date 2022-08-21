import { fetchExit, fetchGetUser, fetchUpdateUser } from '../../utils/api';
import { deleteCookie } from '../../utils/cookie';
import { AppDispatch } from '../../utils/types';
import {
  getUserRequest,
  getUserSuccess,
  getUserFailed,
  exitRequest,
  exitSuccess,
  exitFailed,
} from '../reducers/profile-reducer';
import { refreshToken } from './auth-thunk';

export const getUser = () => (dispatch: AppDispatch) => {
  dispatch(getUserRequest());
  fetchGetUser()
    .then((data) => {
      if (data && data.success) {
        dispatch(getUserSuccess(data.user));
      } else dispatch(getUserFailed('Ошибка данных'));
    })
    .catch((err) => {
      if (err.message === 'jwt expired') {
        dispatch(refreshToken(getUser));
      } else dispatch(getUserFailed(err.message));
    });
};

export const updateUser =
  (payload: { name?: string; email?: string; password?: string }) => (dispatch: AppDispatch) => {
    dispatch(getUserRequest());
    fetchUpdateUser(payload)
      .then((data) => {
        if (data && data.success) {
          dispatch(getUserSuccess(data.user));
        } else dispatch(getUserFailed('Ошибка данных'));
      })
      .catch((err) => {
        dispatch(getUserFailed(err.message));
      });
  };

export const exitUser = () => (dispatch: AppDispatch) => {
  dispatch(exitRequest());
  fetchExit()
    .then((data) => {
      if (data && data.success) {
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
        dispatch(exitSuccess());
      } else dispatch(exitFailed('Ошибка данных'));
    })
    .catch((err) => {
      dispatch(exitFailed(err.message));
    });
};
