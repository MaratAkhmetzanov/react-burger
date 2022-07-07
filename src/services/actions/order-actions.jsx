import { GET_DATA_URL } from "../../utils/constants";
import { ERASE_CONSTRUCTOR } from "./constructor-actions";

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILED = 'CREATE_ORDER_FAILED';

export function getOrder (ingredients) {
  return function (dispatch) {
    dispatch({
      type: CREATE_ORDER_REQUEST
    });
    fetch(`${GET_DATA_URL}/orders`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ingredients: ingredients })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else Promise.reject(`Ошибка ${res.status}`);
      })
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: ERASE_CONSTRUCTOR
          });
          dispatch({
            type: CREATE_ORDER_SUCCESS,
            name: res.name,
            orderNumber: res.order.number
          });
        } else {
          dispatch({
            type: CREATE_ORDER_FAILED
          });
        }
      })
      .catch((e) => {
        dispatch({
          type: CREATE_ORDER_FAILED
        });
      });
  };
}
