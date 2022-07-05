export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILED = 'CREATE_ORDER_FAILED';

const GET_DATA_URL = 'https://norma.nomoreparties.space/api/orders';

export function getIngredients () {
  return function (dispatch) {
    dispatch({
      type: CREATE_ORDER_REQUEST
    });
    fetch(GET_DATA_URL)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else Promise.reject(`Ошибка ${res.status}`);
      })
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: CREATE_ORDER_SUCCESS,
            ingredients: res.data
          });
        } else {
          dispatch({
            type: CREATE_ORDER_FAILED
          });
        }
      })
      .catch(e => {
        dispatch({
          type: CREATE_ORDER_FAILED
        });
      });
  };
}