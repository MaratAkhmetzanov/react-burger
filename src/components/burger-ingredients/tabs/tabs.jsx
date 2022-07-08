import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import { SET_ACTIVE_TAB } from '../../../services/actions/ingredients-actions';

import styleTabs from './tabs.module.scss';

const Tabs = () => {
  const activeTab = useSelector((store) => store.ingredients.activeTab);

  const dispatch = useDispatch();

  const setActiveTab = useCallback(
    (tab) => {
      dispatch({
        type: SET_ACTIVE_TAB,
        tab
      });
    },
    [dispatch]
  );

  return (
    <div className={clsx(styleTabs.tabs, 'mt-5')}>
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

export default Tabs;
