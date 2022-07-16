import AppHeader from '../app-header/app-header';

import styleAppWrapper from './app-wrapper.module.scss';

const AppWrapper = ({ children }) => {
  return (
    <div className={styleAppWrapper.wrapper}>
      <AppHeader />
      <main className={styleAppWrapper.content}>{children}</main>
    </div>
  );
};

export default AppWrapper;
