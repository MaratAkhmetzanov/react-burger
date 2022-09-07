import ingredientsReducer, {
  getIngredientsRequest,
  getIngredientsSuccess,
  getIngredientsFailed,
  setActiveTab,
} from './ingredients-reducer';

describe('ingredients reducer', () => {
  it('initial state return', () => {
    expect(ingredientsReducer(undefined, {})).toEqual({
      ingredients: [],
      getIngredientsRequest: false,
      getIngredientsFailed: '',
      activeTab: 'bun',
    });
  });

  it('action: getIngredientsRequest', () => {
    expect(ingredientsReducer({}, getIngredientsRequest())).toEqual({
      getIngredientsRequest: true,
    });
  });

  it('action: getIngredientsSuccess', () => {
    const payload = [
      {
        _id: '60d3b41abdacab0026a733c7',
        name: 'name',
        type: 'bun',
        proteins: 1,
        fat: 1,
        carbohydrates: 1,
        calories: 1,
        price: 1,
        image: 'https://link.png',
        image_mobile: 'https://link.png',
        image_large: 'https://link.png',
        __v: 1,
      },
    ];
    expect(ingredientsReducer({}, getIngredientsSuccess(payload))).toEqual({
      ingredients: payload,
      getIngredientsRequest: false,
      getIngredientsFailed: '',
    });
  });

  it('action: getIngredientsFailed', () => {
    expect(ingredientsReducer({}, getIngredientsFailed('error message'))).toEqual({
      getIngredientsRequest: false,
      getIngredientsFailed: 'error message',
    });
  });

  it('action: setActiveTab', () => {
    expect(ingredientsReducer({}, setActiveTab('tab name'))).toEqual({
      activeTab: 'tab name',
    });
  });
});
