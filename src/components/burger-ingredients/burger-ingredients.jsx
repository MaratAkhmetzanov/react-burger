import React, { useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import { Scrollbars } from 'react-custom-scrollbars';

import styleIngredients from './burger-ingredients.module.scss';
import Tabs from './tabs/tabs';
import CatalogGroup from './catalog-group/catalog-group';
import Loader from '../loader/loader';
import { getIngredients } from '../../services/middleware/ingredients-middleware';
import { setActiveTab } from '../../services/reducers/ingredients-reducer';

const BurgerIngredients = () => {
  const { ingredients, getIngredientsRequest } = useSelector((store) => ({
    ingredients: store.ingredients.ingredients,
    getIngredientsRequest: store.ingredients.getIngredientsRequest,
  }));

  const scrollRef = useRef();
  const bunTitleRef = useRef();
  const sauceTitleRef = useRef();
  const mainTitleRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setActiveTabHandler = useCallback(
    (tab) => {
      dispatch(setActiveTab(tab));
    },
    [dispatch]
  );

  const handleScroll = () => {
    if (sauceTitleRef && mainTitleRef) {
      const top = scrollRef.current.getScrollTop() + 50;
      const sauceOffset = sauceTitleRef.current.offsetTop;
      const mainOffset = mainTitleRef.current.offsetTop;

      top > sauceOffset && top < mainOffset
        ? setActiveTabHandler('sauce')
        : top > mainOffset
          ? setActiveTabHandler('main')
          : setActiveTabHandler('bun');
    }
  };

  return (
    <section className={styleIngredients.content}>
      <h1 className={clsx(styleIngredients.title, 'text text_type_main-large mt-10')}>Соберите бургер</h1>
      <Tabs />
      {getIngredientsRequest ? (
        <div className={styleIngredients.loader}>
          <Loader />
        </div>
      ) : (
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
