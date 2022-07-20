import { createSlice } from '@reduxjs/toolkit';
import { fetchGetIngredients } from '../../utils/api';

const initialState = {
  ingredients: [],
  isGetIngredientsRequest: false,
  isGetIngredientsFailed: false,
  activeTab: 'bun',
};

const ingredientsReducer = createSlice({
  name: 'order',
  initialState,
  reducers: {
    getIngredientsRequest (state) {
      state.isGetIngredientsRequest = true;
    },
    getIngredientsSuccess (state, { payload }) {
      state.ingredients = payload;
      state.isGetIngredientsRequest = false;
      state.isGetIngredientsFailed = false;
    },
    getIngredientsFailed (state) {
      state.isGetIngredientsRequest = false;
      state.isGetIngredientsFailed = true;
    },
    setActiveTab (state, { payload }) {
      state.activeTab = payload;
    },
  },
});

export const getIngredients = () => (dispatch) => {
  dispatch(getIngredientsRequest());
  fetchGetIngredients()
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

export const {
  getIngredientsRequest,
  getIngredientsSuccess,
  getIngredientsFailed,
  setActiveTab,
  addViewingIngredient,
  deleteViewingIngredient,
} = ingredientsReducer.actions;

export default ingredientsReducer.reducer;
