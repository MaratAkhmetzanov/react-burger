import { combineReducers } from 'redux';
import authReducer from './auth-reducer';
import constructorReducer from './constructor-reducer';
import feedReducer from './feed-reducer';
import ingredientsReducer from './ingredients-reducer';
import orderReducer from './order-reducer';
import profileReducer from './profile-reducer';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer,
  feed: feedReducer,
  profile: profileReducer,
  authorization: authReducer,
});
