import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

import styleAuth from './auth.module.scss';
import { registerUser } from '../services/thunk/auth-thunk';
import { useDispatch, useForm } from '../utils/hooks';
import { TSButton } from '../utils/utils';

const Register = (): JSX.Element => {
  const { values, handleChange, setValues } = useForm({ name: '', email: '', password: '' });
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const nameRef = useRef<HTMLInputElement>(null);

  const location = useLocation<{ savedEmail: 'string' }>();

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

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(registerUser(values.email, values.password, values.name));
  };

  return (
    <div className={styleAuth.wrapper}>
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
          <TSButton type='primary' size='medium'>
            Зарегистрироваться
          </TSButton>
        </div>
      </form>
      <div className={styleAuth.bottom_text}>
        <p className='text text_type_main-default text_color_inactive'>
          Уже зарегистрированы?{' '}
          <Link to={{ pathname: '/login', state: { savedEmail: values.email } }}>Войти</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
