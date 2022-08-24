import { FC, useEffect } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { getIngredients } from '../../services/thunk/ingredients-thunk';
import { useDispatch, useSelector } from '../../utils/hooks';
import Loader from '../loader/loader';
import FeedElement from './feed-element/feed-element';
import styles from './orders-feed.module.scss';

const OrdersFeed: FC = (): JSX.Element => {
  const { getIngredientsRequest, ingredients, isLoaded, ordersHistory } = useSelector(
    (store) => ({
      ingredients: store.ingredients.ingredients,
      getIngredientsRequest: store.ingredients.getIngredientsRequest,
      ordersHistory: store.feed.ordersHistory,
      isLoaded: store.feed.isLoaded,
    })
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={styles.content}>
      <Scrollbars
        autoHeight={true}
        thumbMinSize={120}
        autoHeightMin={window.innerHeight - 188}
        renderTrackVertical={() => <div className={styles.track_vertical} />}
        renderThumbVertical={() => <div className={styles.thumb_vertical} />}
      >
        {isLoaded && !getIngredientsRequest ? (
          ordersHistory.map((order) => (
            <FeedElement
              key={order._id}
              name={order.name}
              number={order.number}
              composition={order.ingredients.map((element) =>
                ingredients.find((ingredient) => ingredient._id === element)
              )}
              date={order.updatedAt}
            />
          ))
        ) : (
          <Loader />
        )}
      </Scrollbars>
    </section>
  );
};

export default OrdersFeed;
