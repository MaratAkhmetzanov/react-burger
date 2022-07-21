import { createSlice } from '@reduxjs/toolkit';
import { fetchExit, fetchGetUser, fetchUpdateUser } from '../../utils/api';
import { deleteCookie } from '../../utils/cookie';
import { refreshToken } from './auth-reducer';

const initialState = {
  user: null,
  getUserRequest: false,
  getUserLoaded: false,
  getUserFailedMessage: '',
  exitRequest: false,
  exitFailed: '',
};

const profileReducer = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUser(state, { payload }) {
      state.user = { ...payload };
      state.exitFailed = '';
    },
    getUserRequest(state) {
      state.getUserRequest = true;
    },
    getUserSuccess(state, { payload }) {
      state.user = { ...payload };
      state.getUserRequest = false;
      state.getUserLoaded = true;
      state.getUserFailedMessage = '';
    },
    getUserFailed(state, { payload }) {
      state.getUserRequest = false;
      state.getUserLoaded = true;
      state.getUserFailedMessage = payload;
    },
    exitRequest(state) {
      state.exitRequest = true;
    },
    exitSuccess(state) {
      state.user = null;
      state.exitRequest = false;
      state.exitFailed = true;
    },
    exitFailed(state, { payload }) {
      state.exitRequest = false;
      state.exitFailed = payload;
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

export const { setUser, getUserRequest, getUserSuccess, getUserFailed, exitRequest, exitSuccess, exitFailed } =
  profileReducer.actions;

export default profileReducer.reducer;
