import React, { FC, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';

import styleTabs from './tabs.module.scss';
import { setActiveTab } from '../../../services/reducers/ingredients-reducer';
import { TODO_ANY } from '../../../utils/types';
import { TSTab } from '../../../utils/utils';

const Tabs: FC<{ onTabToggleHandler: (tab: string) => void }> = ({
  onTabToggleHandler,
}): JSX.Element => {
  const activeTab = useSelector<TODO_ANY, string>((store) => store.ingredients.activeTab);

  const dispatch = useDispatch<TODO_ANY>();

  const setActiveTabHandler = useCallback(
    (tab: string) => {
      onTabToggleHandler(tab);
      dispatch(setActiveTab(tab));
    },
    [dispatch, onTabToggleHandler]
  );

  return (
    <div className={clsx(styleTabs.tabs, 'mt-5')}>
      <TSTab value='bun' active={activeTab === 'bun'} onClick={setActiveTabHandler}>
        Булки
      </TSTab>
      <TSTab value='sauce' active={activeTab === 'sauce'} onClick={setActiveTabHandler}>
        Соусы
      </TSTab>
      <TSTab value='main' active={activeTab === 'main'} onClick={setActiveTabHandler}>
        Начинки
      </TSTab>
    </div>
  );
};

export default Tabs;
