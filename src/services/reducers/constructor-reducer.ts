import { createSlice } from '@reduxjs/toolkit';
import { TIngredientItem, TConstructorItem } from '../../utils/types';

type TConstructorState = {
  constructorBun: null | TIngredientItem;
  constructorItems: Array<TConstructorItem>;
};

const initialState: TConstructorState = {
  constructorBun: null,
  constructorItems: [],
};

const constructorReducer = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addBun(state, { payload }: { payload: TIngredientItem }) {
      state.constructorBun = { ...payload };
    },
    addIngredient(state, { payload }: { payload: TConstructorItem }) {
      state.constructorItems.push({ ...payload });
    },
    deleteIngredient(state, { payload }: { payload: string }) {
      state.constructorItems = state.constructorItems.filter((item) => item.position !== payload);
    },
    moveIngredient(state, { payload }: { payload: Array<TConstructorItem> }) {
      state.constructorItems = [...payload];
    },
    eraseCunstructor(state) {
      state.constructorBun = null;
      state.constructorItems = [];
    },
  },
});

export const { addBun, addIngredient, deleteIngredient, moveIngredient, eraseCunstructor } =
  constructorReducer.actions;

export default constructorReducer.reducer;
