import { store } from './../services/store/index';
export type TODO_ANY = any;

export type TUser = {
  name: string;
  email: string;
};

export type TIngredientItem = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export type TConstructorItem = TIngredientItem & {
  position: string;
};

export type TOrder = {
  _id: string;
  ingredients: Array<string>;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
};

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;