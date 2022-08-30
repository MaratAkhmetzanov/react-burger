import React, { FC, useCallback } from 'react';
import clsx from 'clsx';

import styleTabs from './tabs.module.scss';
import { setActiveTab } from '../../../services/reducers/ingredients-reducer';
import { TSTab } from '../../../utils/utils';
import { useDispatch, useSelector } from '../../../utils/hooks';

const Tabs: FC<{ onTabToggleHandler: (tab: string) => void }> = ({
  onTabToggleHandler,
}): JSX.Element => {
  const activeTab = useSelector((store) => store.ingredients.activeTab);

  const dispatch = useDispatch();

  const setActiveTabHandler = useCallback(
    (tab: string): void => {
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
