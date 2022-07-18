import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

import styleAuthWrapper from './auth-wrapper.module.scss';

const AuthWrapper = ({ children }) => {
  return (
    <div className={styleAuthWrapper.wrapper}>
      <div className='mb-10'>
        <Link to='/'>
          <Logo />
        </Link>
      </div>
      {children}
    </div>
  );
};

export default AuthWrapper;
