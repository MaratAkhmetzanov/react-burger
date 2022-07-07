import { GET_DATA_URL } from '../../utils/constants';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB';
export const ADD_VIEWING_INGREDIENT = 'ADD_VIEWING_INGREDIENT';
export const DELETE_VIEWING_INGREDIENT = 'DELETE_VIEWING_INGREDIENT';

export function getIngredients () {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    fetch(`${GET_DATA_URL}/ingredients`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else Promise.reject(`Ошибка ${res.status}`);
      })
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            ingredients: res.data
          });
        } else {
          dispatch({
            type: GET_INGREDIENTS_FAILED
          });
        }
      })
      .catch((e) => {
        dispatch({
          type: GET_INGREDIENTS_FAILED
        });
      });
  };
}
