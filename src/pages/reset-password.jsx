import React, { useState, useRef, useEffect } from 'react';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import styleAuth from './auth.module.scss';
import { resetPassword } from '../services/thunk/auth-thunk';
import { useDispatch } from 'react-redux';
import { useForm } from '../utils/hooks';

const FORM_TITLE = 'Восстановление пароля';
const BUTTON_TITLE = 'Сохранить';

const PasswordReset = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  const { values, handleChange } = useForm({ password: '', token: '' });
  const passwordRef = useRef(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [fromLocation] = useState(location.state);

  useEffect(() => {
    if (passwordRef.current) {
      passwordRef.current.focus();
    }
  }, []);

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword(values.password, values.token));
    history.push({ pathname: '/login' });
  };

  if (!fromLocation) {
    return <Redirect push={false} to={'/forgot-password'} />;
  }

  return (
    <div className={styleAuth.wrapper}>
      <form className={styleAuth.login_form} onSubmit={onFormSubmit}>
        <h1 className='text text_type_main-medium mb-6'>{FORM_TITLE}</h1>
        <div className={clsx(styleAuth.input, 'mb-6')}>
          <Input
            type={isPasswordVisible ? 'text' : 'password'}
            placeholder={'Введите новый пароль'}
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
        <div className={clsx(styleAuth.input, 'mb-6')}>
          <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            onChange={handleChange}
            value={values.token}
            name={'token'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>
        <div className={clsx(styleAuth.login_button, 'mb-20')}>
          <Button type='primary' size='medium'>
            {BUTTON_TITLE}
          </Button>
        </div>
      </form>
      <div className={styleAuth.bottom_text}>
        <p className='text text_type_main-default text_color_inactive mb-4'>
          Вспомнили пароль? <Link to='/login'>Войти</Link>
        </p>
      </div>
    </div>
  );
};

export default PasswordReset;
