import { GET_DATA_URL } from './constants';
import { getCookie } from './cookie';

const fetchResponseCheck = async (res: Response) => {
  if (res.ok) {
    return res.json();
  } else {
    const message = await res
      .json()
      .then((err: { [key in string]: string | boolean }) => err.message);
    return Promise.reject({ status: res.status, message });
  }
};

export const fetchRegister = async (email: string, password: string, name: string) =>
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

export const fetchLogin = async (email: string, password: string) =>
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

export const fetchForgotPassword = async (email: string) =>
  await fetch(`${GET_DATA_URL}/password-reset`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  }).then(fetchResponseCheck);

export const fetchResetPassword = async (password: string, token: string) =>
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
      authorization: `Bearer ${getCookie('accessToken')}`,
    },
  }).then(fetchResponseCheck);

export const fetchUpdateUser = async ({
  email,
  password,
  name,
}: {
  name?: string;
  email?: string;
  password?: string;
}) =>
  await fetch(`${GET_DATA_URL}/auth/user`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${getCookie('accessToken')}`,
    },
    body: JSON.stringify({
      email,
      password,
      name,
    }),
  }).then(fetchResponseCheck);

export const fetchGetOrder = async (ingredients: Array<string>) =>
  await fetch(`${GET_DATA_URL}/orders`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${getCookie('accessToken')}`,
    },
    body: JSON.stringify({ ingredients }),
  }).then(fetchResponseCheck);

export const fetchGetIngredients = async () =>
  await fetch(`${GET_DATA_URL}/ingredients`).then(fetchResponseCheck);
