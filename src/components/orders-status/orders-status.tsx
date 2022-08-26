import clsx from 'clsx';
import { FC } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useSelector } from '../../utils/hooks';
import Loader from '../loader/loader';
import styles from './orders-status.module.scss';

const OrdersStatus: FC = (): JSX.Element => {
  const { isLoaded, ordersHistory, total, totalToday } = useSelector((store) => ({
    isLoaded: store.feed.isLoaded,
    ordersHistory: store.feed.ordersHistory,
    total: store.feed.total,
    totalToday: store.feed.totalToday,
  }));
  return (
    <section className={styles.content}>
      <Scrollbars
        autoHeight={true}
        thumbMinSize={120}
        autoHeightMin={window.innerHeight - 188}
        renderTrackVertical={() => <div className={styles.track_vertical} />}
        renderThumbVertical={() => <div className={styles.thumb_vertical} />}
      >
        {isLoaded ? (
          <>
            <div className={styles.orders_status}>
              <div>
                <p className='text text_type_main-medium mb-6'>Готовы:</p>
                <div className={styles.status_list}>
                  <ul>
                    {ordersHistory
                      .filter((element) => element.status === 'done')
                      .slice(0, 10)
                      .map((element) => (
                        <li key={element.number} className='text text_type_digits-default mb-2'>
                          {element.number}
                        </li>
                      ))}
                  </ul>
                  {ordersHistory.length > 10 && (
                    <ul>
                      {ordersHistory
                        .filter((element) => element.status === 'done')
                        .slice(11, 21)
                        .map((element) => (
                          <li key={element.number} className='text text_type_digits-default mb-2'>
                            {element.number}
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              </div>
              <div>
                <p className='text text_type_main-medium mb-6'>В работе:</p>
                <div className={styles.status_list}>
                  <ul>
                    {ordersHistory
                      .filter((element) => element.status === 'pending')
                      .slice(0, 10)
                      .map((element) => (
                        <li key={element.number} className='text text_type_digits-default mb-2'>
                          {element.number}
                        </li>
                      ))}
                  </ul>
                  {ordersHistory.length > 10 && (
                    <ul>
                      {ordersHistory
                        .filter((element) => element.status === 'pending')
                        .slice(11, 21)
                        .map((element) => (
                          <li key={element.number} className='text text_type_digits-default mb-2'>
                            {element.number}
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.orders_total}>
              <p className='text text_type_main-medium mt-15'>Выполнено за всё время:</p>
              <p className={clsx(styles.count, 'text text_type_digits-large')}>{total}</p>
            </div>
            <div className={styles.orders_today}>
              <p className='text text_type_main-medium mt-15'>Выполнено за сегодня:</p>
              <p className={clsx(styles.count, 'text text_type_digits-large')}>{totalToday}</p>
            </div>
          </>
        ) : (
          <Loader />
        )}
      </Scrollbars>
    </section>
  );
};

export default OrdersStatus;
