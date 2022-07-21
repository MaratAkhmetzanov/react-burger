import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import styleAuth from './auth.module.scss';
import { loginUser } from '../services/middleware/auth-middleware';
import { useDispatch } from 'react-redux';
import { useForm } from '../utils/hooks';

const FORM_TITLE = 'Вход';
const BUTTON_TITLE = 'Войти';

const Login = () => {
  const { values, handleChange, setValues } = useForm({ email: '', password: '' });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const emailRef = useRef(null);

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.state && location.state.savedEmail) {
      setValues({ ...values, email: location.state.savedEmail });
    }
    if (emailRef.current) {
      emailRef.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(values.email, values.password));
  };

  return (
    <div className={styleAuth.wrapper}>
      <form className={styleAuth.login_form} onSubmit={onFormSubmit}>
        <h1 className='text text_type_main-medium mb-6'>{FORM_TITLE}</h1>
        <div className={clsx(styleAuth.input, 'mb-6')}>
          <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={handleChange}
            value={values.email}
            name={'email'}
            ref={emailRef}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>
        <div className={clsx(styleAuth.input, 'mb-6')}>
          <Input
            type={isPasswordVisible ? 'text' : 'password'}
            placeholder={'Пароль'}
            onChange={handleChange}
            value={values.password}
            name={'password'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            icon={isPasswordVisible ? 'HideIcon' : 'ShowIcon'}
            onIconClick={() => setIsPasswordVisible(!isPasswordVisible)}
          />
        </div>
        <div className={clsx(styleAuth.login_button, 'mb-20')}>
          <Button type='primary' size='medium' onClick={onFormSubmit}>
            {BUTTON_TITLE}
          </Button>
        </div>
      </form>
      <div className={styleAuth.bottom_text}>
        <p className='text text_type_main-default text_color_inactive mb-4'>
          Вы — новый пользователь?{' '}
          <Link to={{ pathname: '/register', state: { savedEmail: values.email } }}>Зарегистрироваться</Link>
        </p>
        <p className='text text_type_main-default text_color_inactive'>
          Забыли пароль?{' '}
          <Link to={{ pathname: '/forgot-password', state: { savedEmail: values.email } }}>Восстановить пароль</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
