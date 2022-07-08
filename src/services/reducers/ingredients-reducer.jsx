import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  SET_ACTIVE_TAB,
  ADD_VIEWING_INGREDIENT,
  DELETE_VIEWING_INGREDIENT
} from '../actions/ingredients-actions';

const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  activeTab: 'bun',
  viewingIngredient: {}
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.ingredients,
        ingredientsRequest: false,
        ingredientsFailed: false
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: true
      };
    }
    case SET_ACTIVE_TAB: {
      return {
        ...state,
        activeTab: action.tab
      };
    }
    case ADD_VIEWING_INGREDIENT: {
      return {
        ...state,
        viewingIngredient: action.ingredient
      };
    }
    case DELETE_VIEWING_INGREDIENT: {
      return {
        ...state,
        viewingIngredient: {}
      };
    }
    default: {
      return state;
    }
  }
};
