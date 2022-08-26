import { FC, useEffect } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import Loader from '../../loader/loader';
import FeedElement from '../../orders-feed/feed-element/feed-element';
import { useDispatch, useSelector } from '../../../utils/hooks';
import styles from './profile-orders.module.scss';
import { getIngredients } from '../../../services/thunk/ingredients-thunk';
import { wsProfileClose, wsProfileConnect } from '../../../services/reducers/profile-reducer';
import { Link, useLocation } from 'react-router-dom';

const ProfileOrders: FC = (): JSX.Element => {
  const { getIngredientsRequest, ingredients, wsProfileConnected, ordersHistory } = useSelector(
    (store) => ({
      ingredients: store.ingredients.ingredients,
      getIngredientsRequest: store.ingredients.getIngredientsRequest,
      ordersHistory: store.profile.ordersHistory,
      wsProfileConnected: store.profile.wsProfileConnected,
    })
  );

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect((): (() => void) => {
    dispatch(wsProfileConnect());
    return () => dispatch(wsProfileClose());
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
        {wsProfileConnected && !getIngredientsRequest ? (
          ordersHistory.map((order) => (
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
