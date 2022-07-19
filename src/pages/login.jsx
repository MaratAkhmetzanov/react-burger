import React, { useState, useRef, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import styleAuth from './auth.module.scss';
import AuthWrapper from '../components/auth-wrapper/auth-wrapper';
import { loginUser } from '../services/reducers/auth-reducer';
import { useDispatch, useSelector } from 'react-redux';

const FORM_TITLE = 'Вход';
const BUTTON_TITLE = 'Войти';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.state && location.state.savedEmail) {
      setEmail(location.state.savedEmail);
    }
    if (emailRef.current) {
      emailRef.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const user = useSelector((store) => store.profile.user);
  const history = useHistory();
  useEffect(() => {
    if (user) {
      history.replace({ pathname: '/' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  return (
    <AuthWrapper>
      <form className={styleAuth.login_form}>
        <h1 className='text text_type_main-medium mb-6'>{FORM_TITLE}</h1>
        <div className={clsx(styleAuth.input, 'mb-6')}>
          <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name={'email'}
            error={false}
            ref={emailRef}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>
        <div className={clsx(styleAuth.input, 'mb-6')}>
          <Input
            type={isPasswordVisible ? 'text' : 'password'}
            placeholder={'Пароль'}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name={'password'}
            error={false}
            ref={passwordRef}
            errorText={'Ошибка'}
            size={'default'}
            icon={isPasswordVisible ? 'HideIcon' : 'ShowIcon'}
            onIconClick={() => setIsPasswordVisible(!isPasswordVisible)}
          />
        </div>
        <div className={clsx(styleAuth.login_button, 'mb-20')}>
          <Button type='primary' size='medium' onClick={loginHandler}>
            {BUTTON_TITLE}
          </Button>
        </div>
      </form>
      <div className={styleAuth.bottom_text}>
        <p className='text text_type_main-default text_color_inactive mb-4'>
          Вы — новый пользователь?{' '}
          <Link to={{ pathname: '/register', state: { savedEmail: email } }}>Зарегистрироваться</Link>
        </p>
        <p className='text text_type_main-default text_color_inactive'>
          Забыли пароль?{' '}
          <Link to={{ pathname: '/forgot-password', state: { savedEmail: email } }}>Восстановить пароль</Link>
        </p>
      </div>
    </AuthWrapper>
  );
};

export default Login;
