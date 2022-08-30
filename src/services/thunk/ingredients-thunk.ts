import { fetchGetIngredients } from '../../utils/api';
import { AppThunk } from '../../utils/types';
import {
  getIngredientsRequest,
  getIngredientsSuccess,
  getIngredientsFailed,
} from '../reducers/ingredients-reducer';

export const getIngredients = ():AppThunk => (dispatch) => {
  dispatch(getIngredientsRequest());
  fetchGetIngredients()
    .then((data) => {
      if (data && data.success) {
        dispatch(getIngredientsSuccess(data.data));
      } else dispatch(getIngredientsFailed('Ошибка данных'));
    })
    .catch((err) => {
      dispatch(getIngredientsFailed(err.message));
    });
};
