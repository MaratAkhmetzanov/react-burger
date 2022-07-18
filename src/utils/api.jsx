import { GET_DATA_URL } from './constants';
import { getCookie } from './cookie';

export const fetchRegister = async (email, password, name) =>
  await fetch(`${GET_DATA_URL}/auth/register`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      name,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else Promise.reject(`Ошибка ${res.status}`);
  });

export const fetchLogin = async (email, password) =>
  await fetch(`${GET_DATA_URL}/auth/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else Promise.reject(`Ошибка ${res.status}`);
  });

export const fetchRefreshToken = async () =>
  await fetch(`${GET_DATA_URL}/auth/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: getCookie('refreshToken'),
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else Promise.reject(`Ошибка ${res.status}`);
  });

export const fetchExit = async () =>
  await fetch(`${GET_DATA_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: getCookie('refreshToken'),
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else Promise.reject(`Ошибка ${res.status}`);
  });

export const fetchForgotPassword = async (email) =>
  await fetch(`${GET_DATA_URL}/password-reset`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else Promise.reject(`Ошибка ${res.status}`);
  });

export const fetchResetPassword = async (password, token) =>
  await fetch(`${GET_DATA_URL}/password-reset/reset`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password,
      token,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else Promise.reject(`Ошибка ${res.status}`);
  });

export const fetchGetUser = async () =>
  await fetch(`${GET_DATA_URL}/auth/user`, {
    method: 'GET',
    authorization: getCookie('accessToken'),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else Promise.reject(`Ошибка ${res.status}`);
  });

export const fetchUpdateUser = async (email, password, name) =>
  await fetch(`${GET_DATA_URL}/auth/user`, {
    method: 'PATCH',
    authorization: getCookie('accessToken'),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      name,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else Promise.reject(`Ошибка ${res.status}`);
  });
