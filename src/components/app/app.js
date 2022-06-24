import React, { useState, useEffect } from 'react';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import styleApp from './app.module.scss';

const GET_DATA_URL = 'https://norma.nomoreparties.space/api/ingredients';

const App = () => {
  const [state, setState] = useState({
    isLoading: false,
    ingredients: []
  });

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getData = () => {
    setState({ ...state, isLoading: true });

    fetch(GET_DATA_URL)
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else console.log(res);
      })
      .then(data => {
        setState({ ingredients: data.data, isLoading: false });
      })
      .catch(e => {
        console.log(e);
      });
  }

  return (
    <div className={styleApp.wrapper}>
      <AppHeader />
      {state.isLoading && <div className={styleApp.loading}>Загрузка...</div>}
      {!state.isLoading && state.ingredients.length &&
        <main className={styleApp.content}>
          <BurgerIngredients data={state.ingredients} />
          <BurgerConstructor data={state.ingredients} />
        </main>
      }
    </div >
  );
}

export default App;
