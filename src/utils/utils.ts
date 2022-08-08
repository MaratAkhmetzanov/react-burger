import { FC, SyntheticEvent } from 'react';
import { Button, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { setCookie } from './cookie';

export const saveTokensUtil = (accessToken:string, refreshToken:string) => {
  if (accessToken) {
    setCookie('accessToken', accessToken.split('Bearer ')[1]);
  }
  if (refreshToken) {
    setCookie('refreshToken', refreshToken);
  }
};

export const TSButton: FC<{
  type?: 'secondary' | 'primary';
  size?: 'small' | 'medium' | 'large';
  onClick?: (() => void) | ((e: SyntheticEvent) => void);
  disabled?: boolean;
  name?: string;
  htmlType?: 'button' | 'submit' | 'reset';
  children?: React.ReactNode;
}> = Button;

export const TSTab: FC<{
  active: boolean;
  value: string;
  onClick: (value: string) => void;
  children?: React.ReactNode;
}> = Tab;