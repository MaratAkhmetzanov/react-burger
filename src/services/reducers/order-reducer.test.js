import orderReducer, {
  createOrderRequest,
  createOrderSuccess,
  createOrderFailed,
  eraseOrder,
} from './order-reducer';

describe('order reducer', () => {
  it('initial state return', () => {
    expect(orderReducer(undefined, {})).toEqual({
      name: '',
      orderNumber: 0,
      createOrderRequest: false,
      createOrderFailed: '',
    });
  });

  it('action: createOrderRequest', () => {
    expect(orderReducer({}, createOrderRequest())).toEqual({
      createOrderRequest: true,
      createOrderFailed: '',
    });
  });

  it('action: createOrderSuccess', () => {
    const payload = {
      name: 'name',
      orderNumber: 1,
    };
    expect(orderReducer({}, createOrderSuccess(payload))).toEqual({
      name: payload.name,
      orderNumber: payload.orderNumber,
      createOrderRequest: false,
      createOrderFailed: '',
    });
  });

  it('action: createOrderFailed', () => {
    expect(orderReducer({}, createOrderFailed('error message'))).toEqual({
      createOrderRequest: false,
      createOrderFailed: 'error message',
    });
  });

  it('action: eraseOrder', () => {
    expect(orderReducer({}, eraseOrder())).toEqual({
      name: '',
      orderNumber: 0,
    });
  });
});
