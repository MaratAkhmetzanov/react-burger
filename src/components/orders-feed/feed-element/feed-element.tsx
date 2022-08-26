import { v4 as uuidv4 } from 'uuid';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import styles from './feed-element.module.scss';
import Moment from 'react-moment';
import { TIngredientItem } from '../../../utils/types';
import clsx from 'clsx';

const FeedElement: FC<{
  composition: Array<TIngredientItem | undefined>;
  date: string;
  name: string;
  number: number;
  status?: string;
}> = ({ composition, date, name, number, status = '' }): JSX.Element => {
  const calendarStrings = {
    lastDay: '[Вчера,] HH:mm',
    sameDay: '[Сегодня,] HH:mm',
    sameElse: 'DD.MM.YYYY, HH:mm',
  };

  const burgerComposition = [...composition]
    .slice(0, 6)
    .map((element, index) => {
      if (index < 5) {
        return (
          <div key={uuidv4()} className={clsx(styles.ingredients_image)}>
            <img src={element?.image_mobile} alt='ingredient' />
          </div>
        );
      } else {
        return (
          <div key={uuidv4()} className={styles.ingredients_image}>
            <img className={styles.transparent} src={element?.image_mobile} alt='ingredient' />
            <span className={clsx(styles.leftCount, 'text text_type_main-default')}>{`+${
              composition.length - 5
            }`}</span>
          </div>
        );
      }
    })
    .reverse();

  return (
    <div className={styles.content}>
      <div className={styles.top}>
        <p className='text text_type_digits-default'>{`#${number}`}</p>
        <p className='text text_type_main-default text_color_inactive'>
          <Moment calendar={calendarStrings} date={date} />
        </p>
      </div>
      <p className='text text_type_main-medium mt-6'>{name}</p>
      {status !== '' && (
        <p className='text text_type_main-default mt-2'>
          {status === 'done' ? 'Выполнен' : status === 'pending' ? 'Готовится' : 'Создан'}
        </p>
      )}
      <div className={clsx(styles.bottom, 'mt-6')}>
        <div className={styles.ingredients}>{burgerComposition}</div>
        <div className={styles.price}>
          <span className='text text_type_digits-default'>
            {composition.reduce(
              (total: number, item) =>
                item ? total + (item.type === 'bun' ? item.price * 2 : item.price) : 0,
              0
            )}
          </span>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </div>
  );
};

export default FeedElement;
