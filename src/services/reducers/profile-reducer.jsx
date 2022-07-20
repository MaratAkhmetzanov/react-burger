import { createSlice } from '@reduxjs/toolkit';
import { fetchExit, fetchGetUser, fetchUpdateUser } from '../../utils/api';
import { deleteCookie } from '../../utils/cookie';
import { refreshToken } from './auth-reducer';

const initialState = {
  user: null,
  isGetUserRequest: false,
  isGetUserLoaded: false,
  getUserFailedMessage: '',
  isExitRequest: false,
  isExitFailed: false,
};

const profileReducer = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUser (state, { payload }) {
      state.user = { ...payload };
      state.isExitFailed = false;
    },
    getUserRequest (state) {
      state.isGetUserRequest = true;
    },
    getUserSuccess (state, { payload }) {
      state.user = { ...payload };
      state.isGetUserRequest = false;
      state.isGetUserLoaded = true;
      state.getUserFailedMessage = '';
    },
    getUserFailed (state, { payload }) {
      state.isGetUserRequest = false;
      state.isGetUserLoaded = true;
      state.getUserFailedMessage = payload;
    },
    exitRequest (state) {
      state.isExitRequest = true;
    },
    exitSuccess (state) {
      state.user = null;
      state.isExitRequest = false;
      state.isExitFailed = true;
    },
    exitFailed (state) {
      state.isExitRequest = false;
      state.isExitFailed = true;
    },
  },
});

export const getUser = () => (dispatch) => {
  dispatch(getUserRequest());
  fetchGetUser()
    .then((data) => {
      if (data && data.success) {
        dispatch(getUserSuccess(data.user));
      } else {
        if (data.message === 'jwt expired') {
          dispatch(refreshToken(getUser));
        } else dispatch(getUserFailed(data.message));
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
      }
      if (data.message) {
        dispatch(getUserFailed(data.message));
      }
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
      } else {
        dispatch(exitFailed());
      }
    })
    .catch((e) => {
      dispatch(exitFailed());
    });
};

export const { setUser, getUserRequest, getUserSuccess, getUserFailed, exitRequest, exitSuccess, exitFailed } =
  profileReducer.actions;

export default profileReducer.reducer;
