import { setCookie } from './cookie';

export const saveTokensUtil = (accessToken, refreshToken) => {
  if (accessToken) {
    setCookie('accessToken', accessToken.split('Bearer ')[1]);
  }
  if (refreshToken) {
    setCookie('refreshToken', refreshToken);
  }
};
