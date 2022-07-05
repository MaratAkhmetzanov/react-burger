import { combineReducers } from 'redux';
import { constructorReducer } from './constructor-reducer';
import { ingredientsReducer } from './ingredients-reducer';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructor: constructorReducer
});