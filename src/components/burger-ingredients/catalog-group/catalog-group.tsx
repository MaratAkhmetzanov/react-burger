import React, { FC, RefObject } from 'react';
import clsx from 'clsx';

import styleCatalogGroup from './catalog-group.module.scss';
import IngredientCard from '../ingredient-card/ingredient-card';
import { TIngredientItem } from '../../../utils/types';

type TProps = {
  ingredients: Array<TIngredientItem>;
  type: string;
  title: string;
  titleRef: RefObject<HTMLHeadingElement>;
};

const CatalogGroup: FC<TProps> = ({ ingredients, type, title, titleRef }): JSX.Element => {
  return (
    <>
      <h2 className='text text_type_main-medium mb-6 mt-4 pt-6' ref={titleRef}>
        {title}
      </h2>
      <div className={clsx(styleCatalogGroup.catalog, 'pl-4 pr-4')}>
        {ingredients
          .filter((ingredient) => ingredient.type === type)
          .map((ingredient) => (
            <div key={ingredient._id}>
              <IngredientCard ingredient={ingredient} />
            </div>
          ))}
      </div>
    </>
  );
};

export default CatalogGroup;
