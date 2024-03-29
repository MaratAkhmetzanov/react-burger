import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';
import styles from './profile-order-id.module.scss';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Scrollbars from 'react-custom-scrollbars';
import Moment from 'react-moment';
import { useDispatch, useSelector } from '../../../utils/hooks';
import { TIngredientItem, TOrder } from '../../../utils/types';
import { AUTH_WS_URL } from '../../../utils/constants';
import { wsClose, wsConnect } from '../../../services/reducers/feed-reducer';
import { getIngredients } from '../../../services/thunk/ingredients-thunk';
import Loader from '../../loader/loader';
import { getCookie } from '../../../utils/cookie';

const ProfileOrderId: FC<{ popup?: boolean }> = ({ popup = false }): JSX.Element => {
  const { ingredients, isLoaded, ordersHistory } = useSelector((store) => ({
    ingredients: store.ingredients.ingredients,
    getIngredientsRequest: store.ingredients.getIngredientsRequest,
    ordersHistory: store.feed.ordersHistory,
    isLoaded: store.feed.isLoaded,
  }));
  const [viewingOrder, setViewingOrder] = useState<TOrder | undefined>(undefined);
  const urlParams = useParams<{ id: string }>();

  const dispatch = useDispatch();

  const calendarStrings = {
    lastDay: '[Вчера,] HH:mm',
    sameDay: '[Сегодня,] HH:mm',
    sameElse: 'DD.MM.YYYY, HH:mm',
  };

  useEffect((): (() => void) | undefined => {
    if (!popup) {
      dispatch(wsConnect(`${AUTH_WS_URL}?token=${getCookie('accessToken')}`));
      return () => dispatch(wsClose());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(getIngredients());
    }

    const order = ordersHistory.find((item) => item.number === parseInt(urlParams.id));
    setViewingOrder(order);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ordersHistory]);

  const getTotal = (): number =>
    viewingOrder
      ? viewingOrder.ingredients.reduce((total: number, item) => {
          const ingredient: TIngredientItem | undefined = ingredients.find(
            (ingredient) => ingredient._id === item
          );
          if (ingredient) {
            return total + (ingredient.type === 'bun' ? ingredient.price * 2 : ingredient.price);
          } else return 0;
        }, 0)
      : 0;

  if (!isLoaded) {
    return <Loader />;
  }

  return (
    <>
      {viewingOrder && (
        <div className={clsx(styles.details_wrapper, 'pt-10 pr-10 pb-10 pl-10')}>
          <p className='text text_type_digits-default mb-6'>{`#${viewingOrder.number}`}</p>
          <p className='text text_type_main-medium mb-3'>{viewingOrder.name}</p>
          <p className='text text_type_main-default mb-10'>
            {viewingOrder.status === 'done' ? 'Выполнен' : 'Готовится'}
          </p>
          <p className='text text_type_main-medium mb-6'>Состав:</p>

          <Scrollbars
            autoHeight={true}
            thumbMinSize={120}
            autoHeightMax={312}
            renderTrackVertical={() => <div className={styles.track_vertical} />}
            renderThumbVertical={() => <div className={styles.thumb_vertical} />}
          >
            <div className={styles.ingredients_wrp}>
              {viewingOrder.ingredients.map((element, index) => {
                const ingredient = ingredients.find((ingredient) => ingredient._id === element);
                return (
                  <div className={styles.ingredient_row} key={index}>
                    <div className={clsx(styles.ingredients_image)}>
                      <img src={ingredient?.image_mobile} alt='ingredient' />
                    </div>
                    <p className='text text_type_main-default mr-4 ml-4'>{ingredient?.name}</p>
                    <div className={styles.price}>
                      <span className='text text_type_digits-default'>
                        {ingredient!.type === 'bun'
                          ? `2 x ${ingredient?.price}`
                          : `${ingredient?.price}`}
                      </span>
                      <CurrencyIcon type='primary' />
                    </div>
                  </div>
                );
              })}
            </div>
          </Scrollbars>
          <div className={clsx(styles.footer, 'mt-10')}>
            <p className='text text_type_main-default text_color_inactive'>
              <Moment calendar={calendarStrings} date={viewingOrder.updatedAt} />
            </p>
            <div className={styles.price}>
              <span className='text text_type_digits-default'>{getTotal()}</span>
              <CurrencyIcon type='primary' />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileOrderId;
