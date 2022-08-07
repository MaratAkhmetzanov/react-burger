import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  getUserRequest: false,
  getUserLoaded: false,
  getUserFailed: '',
  exitRequest: false,
  exitFailed: '',
  userUnauthorized: false,
};

const profileReducer = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUser(state, { payload }) {
      state.user = { ...payload };
      state.userUnauthorized = false;
      state.exitFailed = '';
    },
    getUserRequest(state) {
      state.getUserRequest = true;
    },
    getUserSuccess(state, { payload }) {
      state.user = { ...payload };
      state.userUnauthorized = false;
      state.getUserRequest = false;
      state.getUserLoaded = true;
      state.getUserFailed = '';
    },
    getUserFailed(state, { payload }) {
      state.getUserRequest = false;
      state.getUserLoaded = true;
      state.getUserFailed = payload;
    },
    exitRequest(state) {
      state.exitRequest = true;
    },
    exitSuccess(state) {
      state.user = null;
      state.exitRequest = false;
      state.userUnauthorized = true;
    },
    exitFailed(state, { payload }) {
      state.exitRequest = false;
      state.exitFailed = payload;
    },
    userUnauthorized(state) {
      state.userUnauthorized = true;
    },
  },
});

export const {
  setUser,
  getUserRequest,
  getUserSuccess,
  getUserFailed,
  exitRequest,
  exitSuccess,
  exitFailed,
  userUnauthorized,
} = profileReducer.actions;

export default profileReducer.reducer;
