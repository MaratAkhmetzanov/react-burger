import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import clsx from 'clsx';
import { useRef, useState } from 'react';
import styleProfile from './profile.module.scss';

const Profile = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const userNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  return (
    <section className={styleProfile.content_section}>
      <div className={clsx(styleProfile.input, 'mb-6')}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
          name={'Имя'}
          error={false}
          ref={userNameRef}
          errorText={'Ошибка'}
          size={'default'}
          icon={'EditIcon'}
        />
      </div>
      <div className={clsx(styleProfile.input, 'mb-6')}>
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
          icon={'EditIcon'}
        />
      </div>
      <div className={clsx(styleProfile.input)}>
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
          icon={'EditIcon'}
          onIconClick={() => setIsPasswordVisible(!isPasswordVisible)}
        />
      </div>
    </section>
  );
};

export default Profile;
