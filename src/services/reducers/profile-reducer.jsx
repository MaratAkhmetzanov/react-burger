import { createSlice } from '@reduxjs/toolkit';
import { fetchGetUser, fetchUpdateUser } from '../../utils/api';
import { loginSuccess, refreshToken, registerSuccess } from './auth-reducer';

const initialState = {
  user: null,
  isGetUserRequest: false,
  isGetUserLoaded: false,
  getUserFailedMessage: '',
};

const profileReducer = createSlice({
  name: 'profile',
  initialState,
  reducers: {
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
  },
  extraReducers: {
    [loginSuccess]: (state, { payload }) => {
      state.user = { ...payload };
    },
    [registerSuccess]: (state, { payload }) => {
      state.user = { ...payload };
    },
  },
});

export const getUser = (reqCount = 0) => (dispatch) => {
  dispatch(getUserRequest());
  fetchGetUser()
    .then((data) => {
      if (data && data.success) {
        dispatch(getUserSuccess(data.user));
      } else {
        console.log(data.message);
        if (data.message === 'jwt expired' && reqCount < 4) {
          const counter = reqCount + 1;
          dispatch(refreshToken());
          dispatch(getUser(counter));
        } else dispatch(getUserFailed(data.message));
      }
    })
    .catch((e) => {
      dispatch(getUserFailed(e));
    });
};

export const updateUser = (email, password, name) => (dispatch) => {
  dispatch(getUserRequest());
  fetchUpdateUser(email, password, name)
    .then((data) => {
      if (data && data.success) {
        dispatch(getUserSuccess(data.user));
      }
      if (data.message) {
        dispatch(getUserFailed(data.message));
        console.log(data.message);
      }
    })
    .catch((e) => {
      dispatch(getUserFailed(e));
    });
};

export const { getUserRequest, getUserSuccess, getUserFailed } = profileReducer.actions;

export default profileReducer.reducer;
