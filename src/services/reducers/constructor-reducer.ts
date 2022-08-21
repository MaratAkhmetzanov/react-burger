import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
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
    addIngredient(state, { payload }: { payload: TIngredientItem }) {
      payload.type === 'bun'
        ? (state.constructorBun = { ...payload })
        : (state.constructorItems = [
            ...state.constructorItems,
            { ...payload, position: uuidv4() },
          ]);
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

export const { addIngredient, deleteIngredient, moveIngredient, eraseCunstructor } =
  constructorReducer.actions;

export default constructorReducer.reducer;
