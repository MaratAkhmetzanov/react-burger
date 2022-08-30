import { FC, useEffect } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import Loader from '../../loader/loader';
import FeedElement from '../../orders-feed/feed-element/feed-element';
import { useDispatch, useSelector } from '../../../utils/hooks';
import styles from './profile-orders.module.scss';
import { getIngredients } from '../../../services/thunk/ingredients-thunk';
import { Link, useLocation } from 'react-router-dom';
import { AUTH_WS_URL } from '../../../utils/constants';
import { wsClose, wsConnect } from '../../../services/reducers/feed-reducer';
import { getCookie } from '../../../utils/cookie';

const ProfileOrders: FC = (): JSX.Element => {
  const { getIngredientsRequest, ingredients, isLoaded, ordersHistory } = useSelector(
    (store) => ({
      ingredients: store.ingredients.ingredients,
      getIngredientsRequest: store.ingredients.getIngredientsRequest,
      ordersHistory: store.feed.ordersHistory,
      isLoaded: store.feed.isLoaded,
    })
  );

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect((): (() => void) => {
    dispatch(wsConnect(`${AUTH_WS_URL}?token=${getCookie('accessToken')}`));
    return () => dispatch(wsClose());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getIngredients());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={styles.wrapper}>
      <Scrollbars
        autoHeight={true}
        thumbMinSize={120}
        autoHeightMin={window.innerHeight - 168}
        renderTrackVertical={() => <div className={styles.track_vertical} />}
        renderThumbVertical={() => <div className={styles.thumb_vertical} />}
      >
        {isLoaded && !getIngredientsRequest ? (
          [...ordersHistory].reverse().map((order) => (
            <Link
              key={order._id}
              to={{
                pathname: `/profile/orders/${order.number}`,
                state: { background: location },
              }}
              className={styles.router_link}
            >
            <FeedElement
              name={order.name}
              number={order.number}
              composition={order.ingredients.map((element) =>
                ingredients.find((ingredient) => ingredient._id === element)
              )}
              date={order.updatedAt}
              status = {order.status}
            />
              </Link>
          ))
        ) : (
          <Loader />
        )}
      </Scrollbars>
    </section>
  );
};

export default ProfileOrders;
