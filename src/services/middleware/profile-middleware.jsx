import { fetchExit, fetchGetUser, fetchUpdateUser } from '../../utils/api';
import { deleteCookie } from '../../utils/cookie';
import {
  getUserRequest,
  getUserSuccess,
  getUserFailed,
  exitRequest,
  exitSuccess,
  exitFailed,
} from '../reducers/profile-reducer';
import { refreshToken } from './auth-middleware';

export const getUser = () => (dispatch) => {
  dispatch(getUserRequest());
  fetchGetUser()
    .then((data) => {
      if (data && data.success) {
        dispatch(getUserSuccess(data.user));
      } else {
        if (data.message === 'jwt expired') {
          dispatch(refreshToken(getUser));
        }
        dispatch(getUserFailed(data.message));
      }
    })
    .catch((e) => {
      dispatch(getUserFailed(e));
    });
};

export const updateUser = (payload) => (dispatch) => {
  dispatch(getUserRequest());
  fetchUpdateUser(payload)
    .then((data) => {
      if (data && data.success) {
        dispatch(getUserSuccess(data.user));
      } else dispatch(getUserFailed(data.message));
    })
    .catch((e) => {
      dispatch(getUserFailed(e));
    });
};

export const exitUser = () => (dispatch) => {
  dispatch(exitRequest());
  fetchExit()
    .then((data) => {
      if (data && data.success) {
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
        dispatch(exitSuccess());
      } else dispatch(exitFailed(data.message));
    })
    .catch((e) => {
      dispatch(exitFailed(e));
    });
};
