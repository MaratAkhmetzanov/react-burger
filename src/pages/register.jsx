import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import styleAuth from './auth.module.scss';
import AuthWrapper from '../components/auth-wrapper/auth-wrapper';
import { registerUser } from '../services/reducers/auth-reducer';
import { useDispatch } from 'react-redux';

const Register = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const userNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const {
    state: { savedEmail },
  } = useLocation();

  useEffect(() => {
    if (!email && savedEmail) {
      setEmail(savedEmail);
    }
    if (userNameRef.current && !userName) {
      userNameRef.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dispatch = useDispatch();

  const registerHandler = (e) => {
    e.preventDefault();
    dispatch(registerUser(email, password, userName));
  };

  return (
    <AuthWrapper>
      <form className={styleAuth.login_form}>
        <h1 className='text text_type_main-medium mb-6'>Регистрация</h1>
        <div className={clsx(styleAuth.input, 'mb-6')}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            name={'userName'}
            error={false}
            ref={userNameRef}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>
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
          <Button type='primary' size='medium' onClick={registerHandler}>
            Зарегистрироваться
          </Button>
        </div>
        <div className={styleAuth.bottom_text}>
          <p className='text text_type_main-default text_color_inactive'>
            Уже зарегистрированы? <Link to={{ pathname: '/login', state: { savedEmail: email } }}>Войти</Link>
          </p>
        </div>
      </form>
    </AuthWrapper>
  );
};

export default Register;
