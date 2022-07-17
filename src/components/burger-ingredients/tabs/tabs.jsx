import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import styleTabs from './tabs.module.scss';
import { setActiveTab } from '../../../services/reducers/ingredients-reducer';

const Tabs = () => {
  const activeTab = useSelector((store) => store.ingredients.activeTab);

  const dispatch = useDispatch();

  const setActiveTabHandler = useCallback(
    (tab) => {
      dispatch(setActiveTab(tab));
    },
    [dispatch]
  );

  return (
    <div className={clsx(styleTabs.tabs, 'mt-5')}>
      <Tab value='bun' active={activeTab === 'bun'} onClick={setActiveTabHandler}>
        Булки
      </Tab>
      <Tab value='sauce' active={activeTab === 'sauce'} onClick={setActiveTabHandler}>
        Соусы
      </Tab>
      <Tab value='main' active={activeTab === 'main'} onClick={setActiveTabHandler}>
        Начинки
      </Tab>
    </div>
  );
};

export default Tabs;
