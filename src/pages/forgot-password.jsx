import React, { useState, useRef, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import styleAuth from './auth.module.scss';
import AuthWrapper from '../components/auth-wrapper/auth-wrapper';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../services/reducers/auth-reducer';

const ForgotPassword = () => {
  const changePasswordRequest = useSelector((store) => store.authorization.changePasswordRequest);
  const [email, setEmail] = useState('');
  const emailRef = useRef(null);

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.savedEmail) {
      setEmail(location.state.savedEmail);
    }
    if (emailRef.current) {
      emailRef.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const forgotPasswordHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email, history));
    history.push({ pathname: '/reset-password', state: { from: location } });
  };

  return (
    <AuthWrapper>
      <form className={styleAuth.login_form}>
        <h1 className='text text_type_main-medium mb-6'>Восстановление пароля</h1>
        <div className={clsx(styleAuth.input, 'mb-6')}>
          <Input
            type={'email'}
            placeholder={'Укажите e-mail'}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name={'email'}
            error={false}
            ref={emailRef}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>
        <div className={clsx(styleAuth.login_button, 'mb-20')}>
          {changePasswordRequest
            ? <p className={clsx(styleAuth.loading, 'text text_type_main-default text_color_inactive')}>Загрузка…</p>
            :
            <Button type='primary' size='medium' onClick={forgotPasswordHandler}>
              Восстановить
            </Button>
          }
        </div>
      </form>
      <div className={styleAuth.bottom_text}>
        <p className='text text_type_main-default text_color_inactive'>
          Вспомнили пароль? <Link to={{ pathname: '/login', state: { savedEmail: email } }}>Войти</Link>
        </p>
      </div>
    </AuthWrapper>
  );
};

export default ForgotPassword;
