import { v4 as uuidv4 } from 'uuid';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import styles from './feed-element.module.scss';
import Moment from 'react-moment';
import { TIngredientItem } from '../../../utils/types';
import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom';

const FeedElement: FC<{
  composition: Array<TIngredientItem | undefined>;
  date: string;
  name: string;
  number: number;
}> = ({ composition, date, name, number }): JSX.Element => {
  const calendarStrings = {
    lastDay: '[Вчера,] HH:mm',
    sameDay: '[Сегодня,] HH:mm',
    sameElse: 'DD.MM.YYYY, HH:mm',
  };

  const location = useLocation();

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
    <Link
      to={{
        pathname: `/feed/${number}`,
        state: { background: location },
      }}
      className={styles.router_link}
    >
      <div className={styles.content}>
        <div className={styles.top}>
          <p className='text text_type_digits-default'>{`#${number}`}</p>
          <p className='text text_type_main-default text_color_inactive'>
            <Moment calendar={calendarStrings} date={date} />
          </p>
        </div>
        <p className='text text_type_main-medium'>{name}</p>
        <div className={styles.bottom}>
          <div className={styles.ingredients}>{burgerComposition}</div>
          <div className={styles.price}>
            <span className='text text_type_digits-default'>
              {composition.reduce((total: number, item) => total + (item ? item.price : 0), 0)}
            </span>
            <CurrencyIcon type='primary' />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeedElement;
