import feedReducer, {
  wsConnect,
  wsClose,
  wsConnectSuccess,
  wsConnectClosed,
  wsConnectError,
  setOrdersHistory,
} from './feed-reducer';

describe('feed reducer', () => {
  it('initial state return', () => {
    expect(feedReducer(undefined, {})).toEqual({
      isConnecting: false,
      isConnected: false,
      isLoaded: false,
      ordersHistory: [],
      total: 0,
      totalToday: 0,
    });
  });

  it('action: wsConnect', () => {
    expect(feedReducer({}, wsConnect('WS_URL'))).toEqual({
      isConnecting: true,
    });
  });

  it('action: wsClose', () => {
    expect(feedReducer({}, wsClose())).toEqual({
      isConnecting: false,
      isLoaded: false,
      isConnected: false,
      ordersHistory: [],
    });
  });

  it('action: wsConnectSuccess', () => {
    expect(feedReducer({}, wsConnectSuccess())).toEqual({
      isConnecting: false,
      isConnected: true,
    });
  });

  it('action: wsConnectClosed', () => {
    expect(feedReducer({}, wsConnectClosed())).toEqual({
      isConnecting: false,
      isLoaded: false,
      isConnected: false,
      ordersHistory: [],
    });
  });

  it('action: wsConnectError', () => {
    expect(feedReducer({}, wsConnectError())).toEqual({
      isConnecting: false,
      isConnected: false,
      ordersHistory: [],
    });
  });

  it('action: setOrdersHistory', () => {
    const payload = {
      total: 1,
      totalToday: 1,
      orders: [
        {
          _id: '6317ca4c42d34a001c286320',
          ingredients: [1, 2, 3],
          status: 'done',
          name: 'Name',
          createdAt: '2022-09-06T22:31:40.892Z',
          updatedAt: '2022-09-06T22:31:41.221Z',
          number: 1,
        },
      ],
    };
    expect(feedReducer({}, setOrdersHistory(payload))).toEqual({
      ordersHistory: payload.orders,
      total: payload.total,
      totalToday: payload.totalToday,
      isLoaded: true,
      isConnected: true,
    });
  });
});
