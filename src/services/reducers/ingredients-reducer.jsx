import { createSlice } from '@reduxjs/toolkit';
import { GET_DATA_URL } from '../../utils/constants';

const initialState = {
  ingredients: [],
  isGetIngredientsRequest: false,
  isGetIngredientsFailed: false,
  activeTab: 'bun',
  viewingIngredientId: null,
};

const ingredientsReducer = createSlice({
  name: 'order',
  initialState,
  reducers: {
    getIngredientsRequest(state) {
      state.isGetIngredientsRequest = true;
    },
    getIngredientsSuccess(state, { payload }) {
      state.ingredients = payload;
      state.isGetIngredientsRequest = false;
      state.isGetIngredientsFailed = false;
    },
    getIngredientsFailed(state) {
      state.isGetIngredientsRequest = false;
      state.isGetIngredientsFailed = true;
    },
    setActiveTab(state, { payload }) {
      state.activeTab = payload;
    },
    addViewingIngredient(state, { payload }) {
      state.viewingIngredientId = payload;
    },
    deleteViewingIngredient(state, { payload }) {
      state.viewingIngredientId = null;
    },
  },
});

export const getIngredients = () => (dispatch) => {
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

export const {
  getIngredientsRequest,
  getIngredientsSuccess,
  getIngredientsFailed,
  setActiveTab,
  addViewingIngredient,
  deleteViewingIngredient,
} = ingredientsReducer.actions;

export default ingredientsReducer.reducer;
