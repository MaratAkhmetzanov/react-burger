export const ADD_BUN = 'ADD_BUN';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';

export function addIngredient (ingredient, position) {
  return function (dispatch) {
    console.log(ingredient);
    (ingredient.type === 'bun')
      ? dispatch({
        type: ADD_BUN,
        ingredient: ingredient
      })
      : dispatch({
        type: ADD_INGREDIENT,
        ingredient: ingredient,
        position: position
      })
    console.log(ingredient);
  };
}