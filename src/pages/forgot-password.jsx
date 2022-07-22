import React, { useState, useRef, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import styleAuth from './auth.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../services/thunk/auth-thunk';
import { useForm } from '../utils/hooks';

const ForgotPassword = () => {
  const changePasswordRequest = useSelector((store) => store.authorization.changePasswordRequest);
  const { values, handleChange, setValues } = useForm({ email: '' });
  const emailRef = useRef(null);
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

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
    if (values.email !== '') {
      dispatch(forgotPassword(values.email, history));
      history.push({ pathname: '/reset-password', state: { from: location } });
    } else setIsEmailEmpty(true);
  };

  return (
    <div className={styleAuth.wrapper}>
      <form className={styleAuth.login_form} onSubmit={onFormSubmit}>
        <h1 className='text text_type_main-medium mb-6'>Восстановление пароля</h1>
        {isEmailEmpty && (
          <p className={clsx(styleAuth.error_message, 'text text_type_main-default mb-4')}>Введите почту</p>
        )}
        <div className={clsx(styleAuth.input, 'mb-6')}>
          <Input
            type={'email'}
            placeholder={'Укажите e-mail'}
            onChange={(e) => {
              handleChange(e);
              setIsEmailEmpty(false);
            }}
            value={values.email}
            name={'email'}
            error={false}
            ref={emailRef}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>
        <div className={clsx(styleAuth.login_button, 'mb-20')}>
          {changePasswordRequest ? (
            <p className={clsx(styleAuth.loading, 'text text_type_main-default text_color_inactive')}>Загрузка…</p>
          ) : (
            <Button type='primary' size='medium'>
              Восстановить
            </Button>
          )}
        </div>
      </form>
      <div className={styleAuth.bottom_text}>
        <p className='text text_type_main-default text_color_inactive'>
          Вспомнили пароль? <Link to={{ pathname: '/login', state: { savedEmail: values.email } }}>Войти</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
