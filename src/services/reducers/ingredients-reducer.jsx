import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ingredients: [],
  getIngredientsRequest: false,
  getIngredientsFailed: '',
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
      state.getIngredientsFailed = '';
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

export const {
  getIngredientsRequest,
  getIngredientsSuccess,
  getIngredientsFailed,
  setActiveTab,
} = ingredientsReducer.actions;

export default ingredientsReducer.reducer;
