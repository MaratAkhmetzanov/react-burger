import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';

import styleAuthWrapper from './auth-wrapper.module.scss';

const AuthWrapper = ({ children }) => {
  return (
    <div className={styleAuthWrapper.wrapper}>
      <div className='mb-10'>
        <Logo />
      </div>
      {children}
    </div>
  );
};

export default AuthWrapper;
