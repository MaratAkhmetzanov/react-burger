import { FC, useEffect } from 'react';
import OrdersFeed from '../../components/orders-feed/orders-feed';
import OrdersStatus from '../../components/orders-status/orders-status';
import { wsClose, wsConnect } from '../../services/reducers/feed-reducer';
import { WS_URL } from '../../utils/constants';
import { useDispatch } from '../../utils/hooks';
import styles from './feed-page.module.scss';

const FeedPage: FC = (): JSX.Element => {
  const dispatch = useDispatch();

  useEffect((): (() => void) => {
    dispatch(wsConnect(WS_URL));
    return () => dispatch(wsClose());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className={styles.content}>
      <h1 className='text text_type_main-large mt-10 mb-5'>Лента заказов</h1>
      <div className={styles.layout}>
        <OrdersFeed />
        <OrdersStatus />
      </div>
    </main>
  );
};

export default FeedPage;
