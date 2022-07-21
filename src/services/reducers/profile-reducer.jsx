import { createSlice } from '@reduxjs/toolkit';

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

export const { setUser, getUserRequest, getUserSuccess, getUserFailed, exitRequest, exitSuccess, exitFailed } =
  profileReducer.actions;

export default profileReducer.reducer;
