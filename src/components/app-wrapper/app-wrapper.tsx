import React, { FC } from 'react';
import AppHeader from '../app-header/app-header';

import styleAppWrapper from './app-wrapper.module.scss';

type TProps = {
  children: React.ReactNode;
};

const AppWrapper: FC<TProps> = ({ children }): JSX.Element => {
  return (
    <div className={styleAppWrapper.wrapper}>
      <AppHeader />
      <main className={styleAppWrapper.content}>{children}</main>
    </div>
  );
};

export default AppWrapper;
