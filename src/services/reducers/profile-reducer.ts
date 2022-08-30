import { createSlice } from '@reduxjs/toolkit';
import { TUser } from '../../utils/types';

type TProfileState = {
  user: TUser | null;
  getUserRequest: boolean;
  getUserLoaded: boolean;
  getUserFailed: string;
  exitRequest: boolean;
  exitFailed: string;
  userUnauthorized: boolean;
};

const initialState: TProfileState = {
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
    setUser(state, { payload }: { payload: TUser }) {
      state.user = { ...payload };
      state.userUnauthorized = false;
      state.exitFailed = '';
    },
    getUserRequest(state) {
      state.getUserRequest = true;
    },
    getUserSuccess(state, { payload }: { payload: TUser }) {
      state.user = { ...payload };
      state.userUnauthorized = false;
      state.getUserRequest = false;
      state.getUserLoaded = true;
      state.getUserFailed = '';
    },
    getUserFailed(state, { payload }: { payload: string }) {
      state.getUserRequest = false;
      state.getUserLoaded = true;
      state.getUserFailed = payload;
    },
    exitRequest(state) {
      state.exitRequest = true;
      state.getUserLoaded = true;
    },
    exitSuccess(state) {
      state.user = null;
      state.exitRequest = false;
      state.userUnauthorized = true;
    },
    exitFailed(state, { payload }: { payload: string }) {
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
