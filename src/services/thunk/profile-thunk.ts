import { fetchExit, fetchGetUser, fetchUpdateUser } from '../../utils/api';
import { deleteCookie } from '../../utils/cookie';
import { AppThunk } from '../../utils/types';
import {
  getUserRequest,
  getUserSuccess,
  getUserFailed,
  exitRequest,
  exitSuccess,
  exitFailed,
} from '../reducers/profile-reducer';
import { refreshToken } from './auth-thunk';

export const getUser = ():AppThunk => (dispatch) => {
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
  (payload: { name?: string; email?: string; password?: string }):AppThunk => (dispatch) => {
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

export const exitUser = ():AppThunk => (dispatch) => {
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
