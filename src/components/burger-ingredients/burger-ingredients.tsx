import React, { useEffect, useRef, useCallback, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import { Scrollbars } from 'react-custom-scrollbars';

import styleIngredients from './burger-ingredients.module.scss';
import Tabs from './tabs/tabs';
import CatalogGroup from './catalog-group/catalog-group';
import Loader from '../loader/loader';
import { getIngredients } from '../../services/thunk/ingredients-thunk';
import { setActiveTab } from '../../services/reducers/ingredients-reducer';
import { TIngredientItem, TODO_ANY } from '../../utils/types';

type TStore = {
  ingredients: Array<TIngredientItem>;
  getIngredientsRequest: boolean;
};

const BurgerIngredients: FC = (): JSX.Element => {
  const { ingredients, getIngredientsRequest } = useSelector<TODO_ANY, TStore>((store) => ({
    ingredients: store.ingredients.ingredients,
    getIngredientsRequest: store.ingredients.getIngredientsRequest,
  }));

  const scrollRef = useRef<TODO_ANY>(null);
  const bunTitleRef = useRef<HTMLHeadingElement>(null);
  const sauceTitleRef = useRef<HTMLHeadingElement>(null);
  const mainTitleRef = useRef<HTMLHeadingElement>(null);

  const dispatch = useDispatch<TODO_ANY>();

  useEffect(() => {
    dispatch(getIngredients());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onTabToggleHandler = (tab: string) => {
    if (tab === 'bun' && bunTitleRef.current) {
      bunTitleRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    if (tab === 'sauce' && sauceTitleRef.current) {
      sauceTitleRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    if (tab === 'main' && mainTitleRef.current) {
      mainTitleRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const setActiveTabHandler = useCallback(
    (tab: string) => {
      dispatch(setActiveTab(tab));
    },
    [dispatch]
  );

  const handleScroll = () => {
    if (sauceTitleRef && mainTitleRef) {
      const top = scrollRef.current ? scrollRef.current.getScrollTop() + 50 : 0;
      const sauceOffset = sauceTitleRef.current ? sauceTitleRef.current.offsetTop : 1;
      const mainOffset = mainTitleRef.current ? mainTitleRef.current.offsetTop : 1;

      top > sauceOffset && top < mainOffset
        ? setActiveTabHandler('sauce')
        : top > mainOffset
        ? setActiveTabHandler('main')
        : setActiveTabHandler('bun');
    }
  };

  return (
    <section className={styleIngredients.content}>
      <h1 className={clsx(styleIngredients.title, 'text text_type_main-large mt-10')}>
        Соберите бургер
      </h1>
      <Tabs onTabToggleHandler={onTabToggleHandler} />
      {getIngredientsRequest ? (
        <div className={styleIngredients.loader}>
          <Loader />
        </div>
      ) : (
        <div>
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
              <CatalogGroup
                title='Булки'
                ingredients={ingredients}
                type='bun'
                titleRef={bunTitleRef}
              />
              <CatalogGroup
                title='Соусы'
                ingredients={ingredients}
                type='sauce'
                titleRef={sauceTitleRef}
              />
              <CatalogGroup
                title='Начинка'
                ingredients={ingredients}
                type='main'
                titleRef={mainTitleRef}
              />
            </>
          </Scrollbars>
        </div>
      )}
    </section>
  );
};

export default BurgerIngredients;
