import clsx from 'clsx';
import PropTypes from 'prop-types';

import dataIngredientsType from '../../../utils/types';
import styleCatalogGroup from './catalog-group.module.scss';
import IngredientCard from '../ingredient-card/ingredient-card';

const CatalogGroup = ({ data, type, title, titleRef }) => {
  return (
    <>
      <h2 className='text text_type_main-medium mb-6 mt-10' ref={titleRef}>
        {title}
      </h2>
      <div className={clsx(styleCatalogGroup.catalog, 'pl-4 pr-4')}>
        {data
          .filter((ingredient) => ingredient.type === type)
          .map((ingredient) => (
            <div key={ingredient._id}>
              <IngredientCard item={ingredient} />
            </div>
          ))}
      </div>
    </>
  );
};

CatalogGroup.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(dataIngredientsType).isRequired,
  titleRef: PropTypes.object.isRequired,
};

export default CatalogGroup;
