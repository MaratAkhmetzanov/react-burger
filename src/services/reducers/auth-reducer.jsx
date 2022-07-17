import { createSlice } from "@reduxjs/toolkit";
import { GET_DATA_URL } from '../../utils/constants';

const initialState = {
  forgotPasswordRequest: false,
  forgotPasswordFailed: false,
  resetPasswordRequest: false,
  resetPasswordFailed: false
};

const authReducer = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    forgotPasswordRequest (state) {
      state.forgotPasswordRequest = true;
    },
    forgotPasswordSuccess (state) {
      state.forgotPasswordRequest = false;
      state.forgotPasswordFailed = false;
    },
    forgotPasswordFailed (state) {
      state.forgotPasswordRequest = false;
      state.forgotPasswordFailed = true;
    },
    resetPasswordRequest (state) {
      state.resetPasswordRequest = true;
    },
    resetPasswordSuccess (state) {
      state.resetPasswordRequest = false;
      state.resetPasswordFailed = false;
    },
    resetPasswordFailed (state) {
      state.resetPasswordRequest = false;
      state.resetPasswordFailed = true;
    },
  },
});

export function forgotPassword (email, history) {
  return function (dispatch) {
    dispatch(forgotPasswordRequest());
    fetch(`${GET_DATA_URL}/password-reset`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else Promise.reject(`Ошибка ${res.status}`);
      })
      .then((res) => {
        if (res && res.success) {
          dispatch(forgotPasswordSuccess());
          history.push({ pathname: '/reset-password' });
        } else {
          dispatch(forgotPasswordFailed());
        }
      })
      .catch((e) => {
        dispatch(forgotPasswordFailed());
      });
  };
}

export function resetPassword (password, token) {
  return function (dispatch) {
    dispatch(resetPasswordRequest());
    fetch(`${GET_DATA_URL}/password-reset/reset`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password,
        token,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else Promise.reject(`Ошибка ${res.status}`);
      })
      .then((res) => {
        if (res && res.success) {
          dispatch(forgotPasswordSuccess());
        } else {
          dispatch(forgotPasswordFailed());
        }
      })
      .catch((e) => {
        dispatch(forgotPasswordFailed());
      });
  };
}

export const { forgotPasswordRequest, forgotPasswordSuccess, forgotPasswordFailed, resetPasswordRequest, resetPasswordSuccess, resetPasswordFailed } = authReducer.actions;

export default authReducer.reducer;
