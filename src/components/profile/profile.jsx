import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../services/thunk/profile-thunk';
import { useForm } from '../../utils/hooks';
import styleProfile from './profile.module.scss';

const Profile = () => {
  const { name, email } = useSelector((store) => store.profile.user);
  const { values, handleChange, setValues } = useForm({ name: name, email: email, password: '' });
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [isButtonsVisible, setIsButtonsVisible] = useState(false);
  const [inputInFocus, setInputInFocus] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (name !== values.name || email !== values.email || values.password !== '') {
      setIsButtonsVisible(true);
    } else setIsButtonsVisible(false);
  }, [name, email, values]);

  const discardUserHandler = (e) => {
    e.preventDefault();
    setValues({ name: name, email: email, password: '' });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    let payload = {};
    if (values.name !== name) {
      payload.name = values.name;
    }
    if (values.email !== email) {
      payload.email = values.email;
    }
    if (values.password !== '') {
      payload.password = values.password;
    }
    dispatch(updateUser(payload));
    setValues({ ...values, password: '' });
  };

  return (
    <section>
      <form onSubmit={onFormSubmit}>
        <div className={clsx(styleProfile.input, 'mb-6')}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={handleChange}
            onFocus={(e) => setInputInFocus('name')}
            onBlur={(e) => setInputInFocus('')}
            value={values.name}
            name={'Имя'}
            error={false}
            ref={nameRef}
            errorText={'Ошибка'}
            size={'default'}
            icon={inputInFocus === 'name' ? 'CloseIcon' : 'EditIcon'}
          />
        </div>
        <div className={clsx(styleProfile.input, 'mb-6')}>
          <Input
            type={'text'}
            placeholder={'E-mail'}
            onChange={handleChange}
            onFocus={(e) => setInputInFocus('email')}
            onBlur={(e) => setInputInFocus('')}
            value={values.email}
            name={'email'}
            error={false}
            ref={emailRef}
            errorText={'Ошибка'}
            size={'default'}
            icon={inputInFocus === 'email' ? 'CloseIcon' : 'EditIcon'}
          />
        </div>
        <div className={clsx(styleProfile.input)}>
          <Input
            type={'text'}
            placeholder={'Пароль'}
            onChange={handleChange}
            onFocus={(e) => setInputInFocus('password')}
            onBlur={(e) => setInputInFocus('')}
            value={values.password}
            name={'password'}
            error={false}
            ref={passwordRef}
            errorText={'Ошибка'}
            size={'default'}
            icon={inputInFocus === 'password' ? 'CloseIcon' : 'EditIcon'}
          />
        </div>
        <div className={clsx(styleProfile.buttons, isButtonsVisible ? styleProfile.visible : '', 'mt-6')}>
          <Button type='secondary' size='medium' onClick={discardUserHandler}>
            Отмена
          </Button>
          <Button type='primary' size='medium'>
            Сохранить
          </Button>
        </div>
      </form>
    </section>
  );
};

export default Profile;
