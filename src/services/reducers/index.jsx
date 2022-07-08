import { combineReducers } from 'redux';
import { constructorReducer } from './constructor-reducer';
import { ingredientsReducer } from './ingredients-reducer';
import { orderReducer } from './order-reducer';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer
});