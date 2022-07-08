import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../services/store';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import styleApp from './app.module.scss';

const App = () => {
  return (
    <Provider store={store}>
      <div className={styleApp.wrapper}>
        <AppHeader />
        <main className={styleApp.content}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </main>
      </div>
    </Provider>
  );
};

export default App;
