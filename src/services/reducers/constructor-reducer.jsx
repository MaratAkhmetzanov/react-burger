import { ADD_BUN, ADD_INGREDIENT, DELETE_INGREDIENT } from '../actions/constructor-actions';

const initialState = {
  constructorBun: {},
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
    default: {
      return state;
    }
  }
};
