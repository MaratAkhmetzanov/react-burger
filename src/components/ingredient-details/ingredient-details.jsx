import React from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

import styleIngredientDetails from './ingredient-details.module.scss';

const IngredientDetails = () => {
  const viewingIngredient = useSelector((store) => store.ingredients.viewingIngredient);

  return (
    <div className={clsx(styleIngredientDetails.details_wrapper, 'pt-15 pr-10 pb-15 pl-10')}>
      <h2 className={clsx(styleIngredientDetails.title, 'text text_type_main-large')}>
        Детали ингредиента
      </h2>
      <div className={styleIngredientDetails.checkmark}>
        <img src={viewingIngredient.image_large} alt={viewingIngredient.name} />
      </div>
      <h3 className='text text_type_main-medium mt-4'>{viewingIngredient.name}</h3>
      <div className={clsx(styleIngredientDetails.parameters, 'mt-8')}>
        <div>
          <p className='text text_type_main-default text_color_inactive'>Калории,ккал</p>
          <p className='text text_type_main-default text_color_inactive mt-2'>
            {viewingIngredient.calories}
          </p>
        </div>
        <div>
          <p className='text text_type_main-default text_color_inactive'>Белки,г</p>
          <p className='text text_type_main-default text_color_inactive mt-2'>
            {viewingIngredient.proteins}
          </p>
        </div>
        <div>
          <p className='text text_type_main-default text_color_inactive'>Жиры,г</p>
          <p className='text text_type_main-default text_color_inactive mt-2'>
            {viewingIngredient.fat}
          </p>
        </div>
        <div>
          <p className='text text_type_main-default text_color_inactive'>Углеводы,г</p>
          <p className='text text_type_main-default text_color_inactive mt-2'>
            {viewingIngredient.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;
