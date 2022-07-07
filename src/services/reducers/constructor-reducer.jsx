import { ADD_BUN, ADD_INGREDIENT, DELETE_INGREDIENT, MOVE_INGREDIENT, ERASE_CONSTRUCTOR } from '../actions/constructor-actions';

const initialState = {
  constructorBun: null,
  constructorItems: []
};

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUN: {
      return {
        ...state,
        constructorBun: { ...action.ingredient }
      };
    }
    case ADD_INGREDIENT: {
      return {
        ...state,
        constructorItems: [...state.constructorItems, { ...action.ingredient, position: action.position }]
      };
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        constructorItems: state.constructorItems.filter((item) => item.position !== action.position)
      };
    }
    case MOVE_INGREDIENT: {
      return {
        ...state,
        constructorItems: [...action.ingredients]
      };
    }
    case ERASE_CONSTRUCTOR: {
      return {
        ...state,
        constructorBun: null,
        constructorItems: []
      };
    }
    default: {
      return state;
    }
  }
};
