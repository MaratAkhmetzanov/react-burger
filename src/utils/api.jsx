import { GET_DATA_URL } from './constants';
import { getCookie } from './cookie';

const fetchResponseCheck = (res) => {
  if (res.ok) {
    return res.json();
  } else Promise.reject(`Ошибка ${res.status}`);
  return res.json();
};

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
  }).then(fetchResponseCheck);

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
  }).then(fetchResponseCheck);

export const fetchRefreshToken = async () =>
  await fetch(`${GET_DATA_URL}/auth/token`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: getCookie('refreshToken'),
    }),
  }).then(fetchResponseCheck);

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
  }).then(fetchResponseCheck);

export const fetchForgotPassword = async (email) =>
  await fetch(`${GET_DATA_URL}/password-reset`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  }).then(fetchResponseCheck);

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
  }).then(fetchResponseCheck);

export const fetchGetUser = async () =>
  await fetch(`${GET_DATA_URL}/auth/user`, {
    method: 'GET',
    headers: {
      authorization: `Basic ${getCookie('accessToken')}`,
    },
  }).then(fetchResponseCheck);

export const fetchUpdateUser = async ({ email, password, name }) =>
  await fetch(`${GET_DATA_URL}/auth/user`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Basic ${getCookie('accessToken')}`,
    },
    body: JSON.stringify({
      email,
      password,
      name,
    }),
  }).then(fetchResponseCheck);

export const fetchGetOrder = async (ingredients) =>
  await fetch(`${GET_DATA_URL}/orders`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Basic ${getCookie('accessToken')}`,
    },
    body: JSON.stringify({ ingredients }),
  }).then(fetchResponseCheck);

export const fetchGetIngredients = async () => await fetch(`${GET_DATA_URL}/ingredients`).then(fetchResponseCheck);
