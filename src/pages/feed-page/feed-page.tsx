import { FC } from 'react';
import OrdersFeed from '../../components/orders-feed/orders-feed';
import styles from './feed-page.module.scss';

const FeedPage: FC = (): JSX.Element => {
  return (
    <main className={styles.wrapper}>
      <h1 className='text text_type_main-large mt-10 mb-5'>Лента заказов</h1>
      <div>
        <OrdersFeed />
        {/* <OrdersStatus /> */}
      </div>
    </main>
  );
};

export default FeedPage;
