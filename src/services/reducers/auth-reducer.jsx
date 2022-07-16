import { CHANGE_PASSWORD_FAILED, CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS } from "../actions/auth-actions";

const initialState = {
  changePasswordRequest: false,
  changePasswordFailed: false,
  resetPasswordRequest: false,
  resetPasswordFailed: false
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD_REQUEST: {
      return {
        ...state,
        changePasswordRequest: true
      };
    }
    case CHANGE_PASSWORD_SUCCESS: {
      return {
        ...state,
        changePasswordRequest: false,
        changePasswordFailed: false
      };
    }
    case CHANGE_PASSWORD_FAILED: {
      return {
        ...state,
        changePasswordRequest: false,
        changePasswordFailed: true
      };
    }
    default: {
      return state;
    }
  }
}