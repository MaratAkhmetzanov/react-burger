import { createSlice } from '@reduxjs/toolkit';
import { TIngredientItem } from '../../utils/types';

type TIngredientsState = {
  ingredients: Array<TIngredientItem> | never[];
  getIngredientsRequest: boolean;
  getIngredientsFailed: string;
  activeTab: string;
};

const initialState: TIngredientsState = {
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
    getIngredientsSuccess(state, { payload }: { payload: Array<TIngredientItem> }) {
      state.ingredients = payload;
      state.getIngredientsRequest = false;
      state.getIngredientsFailed = '';
    },
    getIngredientsFailed(state, { payload }: { payload: string }) {
      state.getIngredientsRequest = false;
      state.getIngredientsFailed = payload;
    },
    setActiveTab(state, { payload }: { payload: string }) {
      state.activeTab = payload;
    },
  },
});

export const { getIngredientsRequest, getIngredientsSuccess, getIngredientsFailed, setActiveTab } =
  ingredientsReducer.actions;

export default ingredientsReducer.reducer;
