import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import styleAuth from './auth.module.scss';
import AuthWrapper from '../components/auth-wrapper/auth-wrapper';

const FORM_TITLE = 'Восстановление пароля';
const BUTTON_TITLE = 'Сохранить';

const PasswordReset = () => {
  const [password, setPassword] = useState('');
  const [emailCode, setEmailCode] = useState('');
  const passwordRef = useRef(null);
  const emailCodeRef = useRef(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    if (passwordRef.current) {
      passwordRef.current.focus();
    }
  }, []);

  const passwordResetHandler = (e) => {
    e.preventDefault();
  };

  return (
    <AuthWrapper>
      <form className={styleAuth.login_form}>
        <h1 className='text text_type_main-medium mb-6'>{FORM_TITLE}</h1>
        <div className={clsx(styleAuth.input, 'mb-6')}>
          <Input
            type={isPasswordVisible ? 'text' : 'password'}
            placeholder={'Введите новый пароль'}
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
        <div className={clsx(styleAuth.input, 'mb-6')}>
          <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            onChange={(e) => setEmailCode(e.target.value)}
            value={emailCode}
            name={'emailCode'}
            error={false}
            ref={emailCodeRef}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>
        <div className={clsx(styleAuth.login_button, 'mb-20')}>
          <Button type='primary' size='medium' onClick={passwordResetHandler}>
            {BUTTON_TITLE}
          </Button>
        </div>
      </form>
      <div className={styleAuth.bottom_text}>
        <p className='text text_type_main-default text_color_inactive mb-4'>
          Вспомнили пароль? <Link to='/login'>Войти</Link>
        </p>
      </div>
    </AuthWrapper>
  );
};

export default PasswordReset;
