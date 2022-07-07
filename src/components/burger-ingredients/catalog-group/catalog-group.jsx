import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import {
  ADD_VIEWING_INGREDIENT,
  DELETE_VIEWING_INGREDIENT
} from '../../../services/actions/ingredients-actions';

import IngredientDetails from '../../ingredient-details/ingredient-details';
import Modal from '../../modal/modal';

import dataIngredientsType from '../../../utils/types';
import styleCatalogGroup from './catalog-group.module.scss';
import IngredientCard from '../ingredient-card/ingredient-card';


const CatalogGroup = ({ data, type, title, titleRef }) => {
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
      <h2 className='text text_type_main-medium mb-6 mt-10' ref={titleRef}>
        {title}
      </h2>
      <div className={clsx(styleCatalogGroup.catalog, 'pl-4 pr-4')}>
        {data
          .filter((ingredient) => ingredient.type === type)
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

CatalogGroup.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(dataIngredientsType).isRequired,
  titleRef: PropTypes.object.isRequired
};

export default CatalogGroup;