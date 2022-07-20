import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../services/reducers/profile-reducer';
import styleProfile from './profile.module.scss';

const Profile = () => {
  const { name, email } = useSelector((store) => store.profile.user);
  const [userName, setUserName] = useState(name);
  const [userEmail, setUserEmail] = useState(email);
  const [password, setPassword] = useState('');
  const userNameRef = useRef(null);
  const userEmailRef = useRef(null);
  const passwordRef = useRef(null);

  const [isButtonsVisible, setIsButtonsVisible] = useState(false);
  const [inputInFocus, setInputInFocus] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (name !== userName || email !== userEmail || password !== '') {
      setIsButtonsVisible(true);
    } else setIsButtonsVisible(false);
  }, [name, userName, email, userEmail, password]);

  const discardUserHandler = () => {
    setUserName(name);
    setUserEmail(email);
    setPassword('');
  };

  const updateUserHandler = () => {
    let payload = {};
    if (userName !== name) {
      payload.name = userName;
    }
    if (userEmail !== email) {
      payload.email = userEmail;
    }
    if (password !== '') {
      payload.password = password;
    }
    dispatch(updateUser(payload));
    setPassword('');
  };

  return (
    <section className={styleProfile.content_section}>
      <div className={clsx(styleProfile.input, 'mb-6')}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={(e) => setUserName(e.target.value)}
          onFocus={(e) => setInputInFocus('name')}
          onBlur={(e) => setInputInFocus('')}
          value={userName}
          name={'Имя'}
          error={false}
          ref={userNameRef}
          errorText={'Ошибка'}
          size={'default'}
          icon={inputInFocus === 'name' ? 'CloseIcon' : 'EditIcon'}
        />
      </div>
      <div className={clsx(styleProfile.input, 'mb-6')}>
        <Input
          type={'email'}
          placeholder={'E-mail'}
          onChange={(e) => setUserEmail(e.target.value)}
          onFocus={(e) => setInputInFocus('email')}
          onBlur={(e) => setInputInFocus('')}
          value={userEmail}
          name={'email'}
          error={false}
          ref={userEmailRef}
          errorText={'Ошибка'}
          size={'default'}
          icon={inputInFocus === 'email' ? 'CloseIcon' : 'EditIcon'}
        />
      </div>
      <div className={clsx(styleProfile.input)}>
        <Input
          type={'password'}
          placeholder={'Пароль'}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={(e) => setInputInFocus('password')}
          onBlur={(e) => setInputInFocus('')}
          value={password}
          name={'password'}
          error={false}
          ref={passwordRef}
          errorText={'Ошибка'}
          size={'default'}
          icon={inputInFocus === 'password' ? 'ShowIcon' : 'EditIcon'}
        />
      </div>
      <div className={clsx(styleProfile.buttons, isButtonsVisible ? styleProfile.visible : '', 'mt-6')}>
        <Button type='secondary' size='medium' onClick={discardUserHandler}>
          Отмена
        </Button>
        <Button type='primary' size='medium' onClick={updateUserHandler}>
          Сохранить
        </Button>
      </div>
    </section>
  );
};

export default Profile;
