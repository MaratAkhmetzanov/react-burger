import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import clsx from 'clsx';
import { FC, FormEvent, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { updateUser } from '../../services/thunk/profile-thunk';
import { useDispatch, useForm, useSelector } from '../../utils/hooks';
import { TSButton } from '../../utils/utils';
import styleProfile from './profile.module.scss';

type TSubmitPayload = {
  name?: string;
  email?: string;
  password?: string;
};

const Profile: FC = (): JSX.Element => {
  const { name, email } = useSelector((store) => ({
    name: store.profile.user?.name,
    email: store.profile.user?.email,
  }));
  const { values, handleChange, setValues } = useForm({
    name: name ? name : '',
    email: email ? email : '',
    password: '',
  });
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [isButtonsVisible, setIsButtonsVisible] = useState<boolean>(false);
  const [inputInFocus, setInputInFocus] = useState<string>('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (name !== values.name || email !== values.email || values.password !== '') {
      setIsButtonsVisible(true);
    } else setIsButtonsVisible(false);
  }, [name, email, values]);

  const discardUserHandler = (e: SyntheticEvent): void => {
    e.preventDefault();
    setValues({ name: name ? name : '', email: email ? email : '', password: '' });
  };

  const onFormSubmit = (e: FormEvent): void => {
    e.preventDefault();
    let payload: TSubmitPayload = {};
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
        <div
          className={clsx(
            styleProfile.buttons,
            isButtonsVisible ? styleProfile.visible : '',
            'mt-6'
          )}
        >
          <TSButton type='secondary' size='medium' onClick={discardUserHandler}>
            Отмена
          </TSButton>
          <TSButton type='primary' size='medium'>
            Сохранить
          </TSButton>
        </div>
      </form>
    </section>
  );
};

export default Profile;
