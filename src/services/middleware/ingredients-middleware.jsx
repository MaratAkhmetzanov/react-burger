import { fetchGetIngredients } from '../../utils/api';
import {
  getIngredientsRequest,
  getIngredientsSuccess,
  getIngredientsFailed,
} from '../reducers/ingredients-reducer';

export const getIngredients = () => (dispatch) => {
  dispatch(getIngredientsRequest());
  fetchGetIngredients()
    .then((data) => {
      if (data && data.success) {
        dispatch(getIngredientsSuccess(data.data));
      } else dispatch(getIngredientsFailed(data.message));
    })
    .catch((e) => {
      dispatch(getIngredientsFailed(e));
    });
};
