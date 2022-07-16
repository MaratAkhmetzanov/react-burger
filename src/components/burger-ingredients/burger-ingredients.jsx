import React, { useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import { Scrollbars } from 'react-custom-scrollbars';

import { getIngredients, SET_ACTIVE_TAB } from '../../services/actions/ingredients-actions';

import styleIngredients from './burger-ingredients.module.scss';
import Tabs from './tabs/tabs';
import CatalogGroup from './catalog-group/catalog-group';
import Loader from '../loader/loader';

const BurgerIngredients = () => {
  const { ingredients, ingredientsRequest } = useSelector((store) => ({
    ingredients: store.ingredients.ingredients,
    ingredientsRequest: store.ingredients.ingredientsRequest,
  }));

  const scrollRef = useRef();
  const bunTitleRef = useRef();
  const sauceTitleRef = useRef();
  const mainTitleRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const setActiveTab = useCallback(
    (tab) => {
      dispatch({
        type: SET_ACTIVE_TAB,
        tab,
      });
    },
    [dispatch]
  );

  const handleScroll = () => {
    if (sauceTitleRef && mainTitleRef) {
      const top = scrollRef.current.getScrollTop() + 50;
      const sauceOffset = sauceTitleRef.current.offsetTop;
      const mainOffset = mainTitleRef.current.offsetTop;

      top > sauceOffset && top < mainOffset
        ? setActiveTab('sauce')
        : top > mainOffset
        ? setActiveTab('main')
        : setActiveTab('bun');
    }
  };

  return (
    <section className={styleIngredients.content}>
      <h1 className={clsx(styleIngredients.title, 'text text_type_main-large mt-10')}>Соберите бургер</h1>
      <Tabs />
      {ingredientsRequest
      ?(
        <div className={styleIngredients.loader}>
          <Loader />
        </div>
      )
      :(
        <Scrollbars
          autoHeight={true}
          thumbMinSize={120}
          autoHeightMin={window.innerHeight - 245}
          renderTrackVertical={() => <div className={styleIngredients.track_vertical} />}
          renderThumbVertical={() => <div className={styleIngredients.thumb_vertical} />}
          onScroll={handleScroll}
          ref={scrollRef}
        >
          <>
            <CatalogGroup title='Булки' data={ingredients} type='bun' titleRef={bunTitleRef} />
            <CatalogGroup title='Соусы' data={ingredients} type='sauce' titleRef={sauceTitleRef} />
            <CatalogGroup title='Начинка' data={ingredients} type='main' titleRef={mainTitleRef} />
          </>
        </Scrollbars>
      )}
    </section>
  );
};

export default BurgerIngredients;
