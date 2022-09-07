import constructorReducer, {
  addBun,
  addIngredient,
  deleteIngredient,
  moveIngredient,
  eraseCunstructor,
} from './constructor-reducer';

describe('constructor reducer', () => {
  it('initial state return', () => {
    expect(constructorReducer(undefined, {})).toEqual({
      constructorBun: null,
      constructorItems: [],
    });
  });

  it('action: addBun', () => {
    const payload = {
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
    };
    expect(constructorReducer({}, addBun(payload))).toEqual({
      constructorBun: payload,
    });
  });

  it('action: addIngredient', () => {
    const payload = {
      _id: '60d3b41abdacab0026a733c7',
      name: 'name',
      type: 'sause',
      proteins: 1,
      fat: 1,
      carbohydrates: 1,
      calories: 1,
      price: 1,
      image: 'https://link.png',
      image_mobile: 'https://link.png',
      image_large: 'https://link.png',
      __v: 1,
      position: '0dca5ef6',
    };
    const prevState = {
      constructorBun: null,
      constructorItems: [],
    };
    expect(constructorReducer(prevState, addIngredient(payload))).toEqual({
      constructorBun: null,
      constructorItems: [payload],
    });
  });

  it('action: deleteIngredient', () => {
    const prevState = {
      constructorBun: null,
      constructorItems: [
        {
          _id: '60d3b41abdacab0026a733c7',
          name: 'name',
          type: 'sause',
          proteins: 1,
          fat: 1,
          carbohydrates: 1,
          calories: 1,
          price: 1,
          image: 'https://link.png',
          image_mobile: 'https://link.png',
          image_large: 'https://link.png',
          __v: 1,
          position: '0dca5ef6',
        },
      ],
    };
    expect(constructorReducer(prevState, deleteIngredient('0dca5ef6'))).toEqual({
      constructorBun: null,
      constructorItems: [],
    });
  });

  it('action: moveIngredient', () => {
    const prevState = {
      constructorBun: null,
      constructorItems: [
        {
          _id: '60d3b41abdacab0026a733c7',
          name: 'name',
          type: 'sause',
          proteins: 1,
          fat: 1,
          carbohydrates: 1,
          calories: 1,
          price: 1,
          image: 'https://link.png',
          image_mobile: 'https://link.png',
          image_large: 'https://link.png',
          __v: 1,
          position: '1',
        },
        {
          _id: '60d3b41abdacab0026a733c7',
          name: 'name',
          type: 'sause',
          proteins: 1,
          fat: 1,
          carbohydrates: 1,
          calories: 1,
          price: 1,
          image: 'https://link.png',
          image_mobile: 'https://link.png',
          image_large: 'https://link.png',
          __v: 1,
          position: '2',
        },
      ],
    };
    const payload = [
      {
        _id: '60d3b41abdacab0026a733c7',
        name: 'name',
        type: 'sause',
        proteins: 1,
        fat: 1,
        carbohydrates: 1,
        calories: 1,
        price: 1,
        image: 'https://link.png',
        image_mobile: 'https://link.png',
        image_large: 'https://link.png',
        __v: 1,
        position: '2',
      },
      {
        _id: '60d3b41abdacab0026a733c7',
        name: 'name',
        type: 'sause',
        proteins: 1,
        fat: 1,
        carbohydrates: 1,
        calories: 1,
        price: 1,
        image: 'https://link.png',
        image_mobile: 'https://link.png',
        image_large: 'https://link.png',
        __v: 1,
        position: '1',
      },
    ];
    expect(constructorReducer(prevState, moveIngredient(payload))).toEqual({
      constructorBun: null,
      constructorItems: payload,
    });
  });

  it('action: eraseCunstructor', () => {
    const prevState = {
      constructorBun: {
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
        position: '1',
      },
      constructorItems: [
        {
          _id: '60d3b41abdacab0026a733c7',
          name: 'name',
          type: 'sause',
          proteins: 1,
          fat: 1,
          carbohydrates: 1,
          calories: 1,
          price: 1,
          image: 'https://link.png',
          image_mobile: 'https://link.png',
          image_large: 'https://link.png',
          __v: 1,
          position: '2',
        },
      ],
    };
    expect(constructorReducer(prevState, eraseCunstructor())).toEqual({
      constructorBun: null,
      constructorItems: [],
    });
  });
});
