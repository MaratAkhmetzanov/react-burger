import { createSlice } from '@reduxjs/toolkit';
import { fetchGetUser, fetchUpdateUser } from '../../utils/api';
import { loginSuccess, registerSuccess } from './auth-reducer';

const initialState = {
  user: null,
  isGetUserRequest: false,
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
      state.getUserFailedMessage = '';
    },
    getUserFailed (state, { payload }) {
      state.isGetUserRequest = false;
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

export const getUser = () => (dispatch) => {
  dispatch(getUserRequest());
  fetchGetUser()
    .then((data) => {
      if (data && data.success) {
        dispatch(getUserSuccess(data.user));
      } else {
        dispatch(getUserFailed(data.message));
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
      } else {
        dispatch(getUserFailed(data.message));
      }
    })
    .catch((e) => {
      dispatch(getUserFailed(e));
    });
};

export const { getUserRequest, getUserSuccess, getUserFailed } = profileReducer.actions;

export default profileReducer.reducer;
