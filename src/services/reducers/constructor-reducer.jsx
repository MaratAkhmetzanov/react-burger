import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  constructorBun: null,
  constructorItems: [],
};

const constructorReducer = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient(state, { payload }) {
      payload.type === 'bun'
        ? (state.constructorBun = { ...payload })
        : (state.constructorItems = [...state.constructorItems, { ...payload, position: uuidv4() }]);
    },
    deleteIngredient(state, { payload }) {
      state.constructorItems = state.constructorItems.filter((item) => item.position !== payload);
    },
    moveIngredient(state, { payload }) {
      state.constructorItems = [...payload];
    },
    eraseCunstructor(state, { payload }) {
      state.constructorBun = null;
      state.constructorItems = [];
    },
  },
});

export const { addIngredient, deleteIngredient, moveIngredient, eraseCunstructor } = constructorReducer.actions;

export default constructorReducer.reducer;
