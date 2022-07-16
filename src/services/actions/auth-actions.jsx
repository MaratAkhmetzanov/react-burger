import { GET_DATA_URL } from '../../utils/constants';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';
export const CHANGE_PASSWORD_REQUEST = 'CHANGE_PASSWORD_REQUEST';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_FAILED = 'CHANGE_PASSWORD_FAILED';

export function forgotPassword (email, history) {
  return function (dispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });
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
          dispatch({
            type: RESET_PASSWORD_SUCCESS,
          });
          history.push({ pathname: '/reset-password' });
        } else {
          dispatch({
            type: RESET_PASSWORD_FAILED,
          });
        }
      })
      .catch((e) => {
        dispatch({
          type: RESET_PASSWORD_FAILED,
        });
      });
  };
}

export function resetPassword (password, token) {
  return function (dispatch) {
    dispatch({
      type: CHANGE_PASSWORD_REQUEST,
    });
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
          dispatch({
            type: CHANGE_PASSWORD_SUCCESS,
          });
        } else {
          dispatch({
            type: CHANGE_PASSWORD_FAILED,
          });
        }
      })
      .catch((e) => {
        dispatch({
          type: CHANGE_PASSWORD_FAILED,
        });
      });
  };
}
