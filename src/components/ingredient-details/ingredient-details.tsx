import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';
import { getIngredients } from '../../services/thunk/ingredients-thunk';
import { useDispatch, useSelector } from '../../utils/hooks';
import { TIngredientItem } from '../../utils/types';
import Loader from '../loader/loader';
import styleIngredientDetails from './ingredient-details.module.scss';

const IngredientDetails: FC = (): JSX.Element => {
  const ingredients = useSelector(
    (store) => store.ingredients.ingredients
  );
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
  const [viewingIngredient, setViewingIngredient] = useState<TIngredientItem | undefined>(
    undefined
  );
  const urlParams = useParams<{ id: string }>();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(getIngredients());
    }
    setViewingIngredient(ingredients.find((item) => item._id === urlParams.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredients]);

  return (
    <>
      {viewingIngredient && (
        <div className={clsx(styleIngredientDetails.details_wrapper, 'pt-15 pr-10 pb-15 pl-10')}>
          <h2 className={clsx(styleIngredientDetails.title, 'text text_type_main-large')}>
            Детали ингредиента
          </h2>
          <div className={styleIngredientDetails.ingredient_img}>
            {!isImageLoaded && <Loader />}
            <img
              src={viewingIngredient.image_large}
              alt={viewingIngredient.name}
              className={
                !isImageLoaded ? styleIngredientDetails.hidden : styleIngredientDetails.visible
              }
              onLoad={() => setIsImageLoaded(true)}
            />
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
      )}
    </>
  );
};

export default IngredientDetails;
