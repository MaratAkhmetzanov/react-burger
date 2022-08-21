import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import styles from './feed-element.module.scss';

const FeedElement: FC = (): JSX.Element => {
  return (
    <div className={styles.content}>
      <div className={styles.top}>
        <p className='text text_type_digits-default'>{`#1234567890`}</p>
        <p className='text text_type_main-default text_color_inactive'>Date</p>
      </div>
      <p className='text text_type_main-medium'>Death Star Starship Main бургер</p>
      <div className={styles.bottom}>
        <div className={styles.ingredients}>
          <div className={styles.ingredients_image}>
            <img src='https://www.imgonline.com.ua/examples/bee-on-daisy.jpg' alt='ingredient' />
          </div>
          <div className={styles.ingredients_image}>
            <img src='https://www.imgonline.com.ua/examples/bee-on-daisy.jpg' alt='ingredient' />
          </div>
        </div>
        <div>
          <span>480</span>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </div>
  );
};

export default FeedElement;
