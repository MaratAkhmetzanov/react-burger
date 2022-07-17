import { createSlice } from '@reduxjs/toolkit';
import { GET_DATA_URL } from '../../utils/constants';

const initialState = {
  ingredients: [],
  getIngredientsRequest: false,
  getIngredientsFailed: false,
  activeTab: 'bun',
  viewingIngredient: null
};

const ingredientsReducer = createSlice({
  name: 'order',
  initialState,
  reducers: {
    getIngredientsRequest (state) {
      state.getIngredientsRequest = true;
    },
    getIngredientsSuccess (state, { payload }) {
      state.ingredients = payload;
      state.getIngredientsRequest = false;
      state.getIngredientsFailed = false;
    },
    getIngredientsFailed (state) {
      state.getIngredientsRequest = false;
      state.getIngredientsFailed = true;
    },
    setActiveTab (state, { payload }) {
      state.activeTab = payload;
    },
    addViewingIngredient (state, { payload }) {
      state.viewingIngredient = payload;
    },
    deleteViewingIngredient (state, { payload }) {
      state.viewingIngredient = null;
    },
  },
});

export function getIngredients () {
  return function (dispatch) {
    dispatch(getIngredientsRequest());
    fetch(`${GET_DATA_URL}/ingredients`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else Promise.reject(`Ошибка ${res.status}`);
      })
      .then((res) => {
        if (res && res.success) {
          dispatch(getIngredientsSuccess(res.data));
        } else {
          dispatch(getIngredientsFailed());
        }
      })
      .catch((e) => {
        dispatch(getIngredientsFailed());
      });
  };
}

export const { getIngredientsRequest, getIngredientsSuccess, getIngredientsFailed, setActiveTab, addViewingIngredient,deleteViewingIngredient } = ingredientsReducer.actions;

export default ingredientsReducer.reducer;