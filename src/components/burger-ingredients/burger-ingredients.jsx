import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { Scrollbars } from 'react-custom-scrollbars';

import {
  getIngredients,
  SET_ACTIVE_TAB,
  ADD_VIEWING_INGREDIENT,
  DELETE_VIEWING_INGREDIENT
} from '../../services/actions/ingredients-actions';

import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';

import dataIngredientsType from '../../utils/types';
import styleIngredients from './burger-ingredients.module.scss';

const Tabs = () => {
  const activeTab = useSelector((store) => store.ingredients.activeTab);

  const dispatch = useDispatch();

  const setActiveTab = (tab) => {
    dispatch({
      type: SET_ACTIVE_TAB,
      tab
    });
  };

  return (
    <div className={clsx(styleIngredients.tabs, 'mt-5')}>
      <Tab value='bun' active={activeTab === 'bun'} onClick={setActiveTab}>
        Булки
      </Tab>
      <Tab value='sauce' active={activeTab === 'sauce'} onClick={setActiveTab}>
        Соусы
      </Tab>
      <Tab value='main' active={activeTab === 'main'} onClick={setActiveTab}>
        Начинки
      </Tab>
    </div>
  );
};

const IngredientCard = ({ image, price, name, item }) => {
  const count = useSelector((store) =>
    store.burgerConstructor.constructorBun &&
      store.burgerConstructor.constructorBun._id === item._id
      ? 2
      : store.burgerConstructor.constructorItems
        ? store.burgerConstructor.constructorItems.filter((ingredient) => item._id === ingredient._id)
          .length
        : 0
  );

  const [, bunDragRef] = useDrag({
    type: 'bun',
    item: { item }
  });

  const [, ingredientDragRef] = useDrag({
    type: 'ingredient',
    item: { item }
  });

  return (
    <div
      ref={item.type === 'bun' ? bunDragRef : ingredientDragRef}
      className={clsx(styleIngredients.card)}
    >
      <img src={image} alt={name} className='ml-4 mr-4' />
      <div className={clsx(styleIngredients.card_price, 'mt-1 mb-1')}>
        <span className='text text_type_digits-default mr-2'>{price}</span>{' '}
        <CurrencyIcon type='primary' />
      </div>
      <div>
        <p className={clsx(styleIngredients.card_name, 'text text_type_main-default')}>{name}</p>
      </div>
      {!!count && (
        <div className={styleIngredients.counter}>
          <Counter count={count} size='default' />
        </div>
      )}
    </div>
  );
};

const CatalogGroup = (props) => {
  const [modalVisibility, setModalVisibility] = useState(false);

  const dispatch = useDispatch();

  const handleOpenModal = (ingredient) => {
    dispatch({
      type: ADD_VIEWING_INGREDIENT,
      ingredient
    });
    setModalVisibility(true);
  };

  const handleCloseModal = () => {
    setModalVisibility(false);
    dispatch({
      type: DELETE_VIEWING_INGREDIENT
    });
  };

  return (
    <>
      <h2 className='text text_type_main-medium mb-6 mt-10' ref={props.titleRef}>
        {props.title}
      </h2>
      <div className={clsx(styleIngredients.catalog, 'pl-4 pr-4')}>
        {props.data
          .filter(({ type }) => type === props.type)
          .map((ingredient) => (
            <div key={ingredient._id} onClick={() => handleOpenModal(ingredient)}>
              <IngredientCard
                image={ingredient.image}
                price={ingredient.price}
                name={ingredient.name}
                item={ingredient}
              />
            </div>
          ))}
      </div>
      {modalVisibility && (
        <Modal closeModal={handleCloseModal}>
          <IngredientDetails />
        </Modal>
      )}
    </>
  );
};

const BurgerIngredients = () => {
  const { ingredients, ingredientsRequest } = useSelector((store) => ({
    ingredients: store.ingredients.ingredients,
    ingredientsRequest: store.ingredients.ingredientsRequest
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
        tab
      });
    },
    [dispatch]
  );

  const handleScroll = () => {
    const top = scrollRef.current.getScrollTop() + 50;
    const sauceOffset = sauceTitleRef.current.offsetTop;
    const mainOffset = mainTitleRef.current.offsetTop;

    top > sauceOffset && top < mainOffset
      ? setActiveTab('sauce')
      : top > mainOffset
        ? setActiveTab('main')
        : setActiveTab('bun');
  };

  return (
    <section className={styleIngredients.content}>
      <h1 className={clsx(styleIngredients.title, 'text text_type_main-large mt-10')}>
        Соберите бургер
      </h1>
      <Tabs />
      <Scrollbars
        autoHeight={true}
        thumbMinSize={120}
        autoHeightMin={window.innerHeight - 245}
        renderTrackVertical={() => <div className={styleIngredients.track_vertical} />}
        renderThumbVertical={() => <div className={styleIngredients.thumb_vertical} />}
        onScroll={handleScroll}
        ref={scrollRef}
      >
        {ingredientsRequest && <div className={styleIngredients.loading}>Загрузка...</div>}
        {!ingredientsRequest && (
          <>
            <CatalogGroup title='Булки' data={ingredients} type='bun' titleRef={bunTitleRef} />
            <CatalogGroup title='Соусы' data={ingredients} type='sauce' titleRef={sauceTitleRef} />
            <CatalogGroup title='Начинка' data={ingredients} type='main' titleRef={mainTitleRef} />
          </>
        )}
      </Scrollbars>
    </section>
  );
};

IngredientCard.propTypes = {
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  item: PropTypes.arrayOf(dataIngredientsType).isRequired
};

CatalogGroup.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(dataIngredientsType).isRequired,
  titleRef: PropTypes.string.isRequired
};

export default BurgerIngredients;
