import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import styleAuth from './auth.module.scss';
import AuthWrapper from '../components/auth-wrapper/auth-wrapper';
import { registerUser } from '../services/middleware/auth-middleware';
import { useDispatch } from 'react-redux';
import { useForm } from '../utils/hooks';

const Register = () => {
  const location = useLocation();
  const { values, handleChange, setValues } = useForm({ name: '', email: '', password: '' });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const nameRef = useRef(null);

  useEffect(() => {
    if (location.state && location.state.savedEmail) {
      setValues({ ...values, email: location.state.savedEmail });
    }
    if (nameRef.current) {
      nameRef.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dispatch = useDispatch();

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(values.email, values.password, values.name));
  };

  return (
    <AuthWrapper>
      <form className={styleAuth.login_form} onSubmit={onFormSubmit}>
        <h1 className='text text_type_main-medium mb-6'>Регистрация</h1>
        <div className={clsx(styleAuth.input, 'mb-6')}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={handleChange}
            value={values.name}
            name={'name'}
            error={false}
            ref={nameRef}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>
        <div className={clsx(styleAuth.input, 'mb-6')}>
          <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={handleChange}
            value={values.email}
            name={'email'}
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
            Зарегистрироваться
          </Button>
        </div>
        <div className={styleAuth.bottom_text}>
          <p className='text text_type_main-default text_color_inactive'>
            Уже зарегистрированы? <Link to={{ pathname: '/login', state: { savedEmail: values.email } }}>Войти</Link>
          </p>
        </div>
      </form>
    </AuthWrapper>
  );
};

export default Register;
