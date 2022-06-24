import React from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import Modal from '../modal/modal';
import ModalOverlay from '../modal-overlay/modal-overlay';

import styleIngredientDetails from './ingredient-details.module.scss';
import dataIngredientsType from '../../utils/types';

const modalRoot = document.getElementById('root');

const IngredientDetails = ({ ingredient, closeModal }) => {
  return createPortal(
    <ModalOverlay closeModal={closeModal}>
      <Modal closeModal={closeModal}>
        <div className={clsx(styleIngredientDetails.details_wrapper, 'pt-10 pr-10 pb-15 pl-10')}>
          <h2 className={clsx(styleIngredientDetails.title, 'text text_type_main-large')}>Детали ингредиента</h2>
          <div><img src={ingredient.image_large} alt={ingredient.name} /></div>
          <h3 className='text text_type_main-medium mt-4'>{ingredient.name}</h3>
          <div className={clsx(styleIngredientDetails.parameters, 'mt-8')}>
            <div>
              <p className="text text_type_main-default text_color_inactive">
                Калории,ккал
              </p>
              <p className="text text_type_main-default text_color_inactive mt-2">
                {ingredient.calories}
              </p>
            </div>
            <div>
              <p className="text text_type_main-default text_color_inactive">
                Белки,г
              </p>
              <p className="text text_type_main-default text_color_inactive mt-2">
                {ingredient.proteins}
              </p>
            </div>
            <div>
              <p className="text text_type_main-default text_color_inactive">
                Жиры,г
              </p>
              <p className="text text_type_main-default text_color_inactive mt-2">
                {ingredient.fat}
              </p>
            </div>
            <div>
              <p className="text text_type_main-default text_color_inactive">
                Углеводы,г
              </p>
              <p className="text text_type_main-default text_color_inactive mt-2">
                {ingredient.carbohydrates}
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </ModalOverlay>,
    modalRoot
  )
}

IngredientDetails.propTypes = {
  ingredient: dataIngredientsType.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default IngredientDetails;