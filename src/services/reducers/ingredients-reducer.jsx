import { createSlice } from '@reduxjs/toolkit';
import { fetchGetIngredients } from '../../utils/api';

const initialState = {
  ingredients: [],
  getIngredientsRequest: false,
  getIngredientsFailed: false,
  activeTab: 'bun',
};

const ingredientsReducer = createSlice({
  name: 'order',
  initialState,
  reducers: {
    getIngredientsRequest(state) {
      state.getIngredientsRequest = true;
    },
    getIngredientsSuccess(state, { payload }) {
      state.ingredients = payload;
      state.getIngredientsRequest = false;
      state.getIngredientsFailed = false;
    },
    getIngredientsFailed(state, { payload }) {
      state.getIngredientsRequest = false;
      state.getIngredientsFailed = payload;
    },
    setActiveTab(state, { payload }) {
      state.activeTab = payload;
    },
  },
});

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

export const {
  getIngredientsRequest,
  getIngredientsSuccess,
  getIngredientsFailed,
  setActiveTab,
  addViewingIngredient,
  deleteViewingIngredient,
} = ingredientsReducer.actions;

export default ingredientsReducer.reducer;
