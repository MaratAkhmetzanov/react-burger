import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILED,
  ERASE_ORDER
} from '../actions/order-actions';

const initialState = {
  name: '',
  orderNumber: 0,
  orderRequest: false,
  orderFailed: false
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true
      };
    }
    case CREATE_ORDER_SUCCESS: {
      return {
        ...state,
        name: action.name,
        orderNumber: action.orderNumber,
        orderRequest: false,
        orderFailed: false
      };
    }
    case CREATE_ORDER_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true
      };
    }
    case ERASE_ORDER: {
      return {
        ...state,
        name: '',
        orderNumber: 0
      };
    }
    default: {
      return state;
    }
  }
};
