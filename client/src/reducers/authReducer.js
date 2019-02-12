import {CLEAR_REGISTER, REGISTER_SUCCESS, SET_CURRENT_USER, UPDATE_FAILED, UPDATE_SUCCESS} from "../constants";
import isEmpty from "../utils/isEmpty";

const initialState = {
  isAuthenticated: false,
  user: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {...state, registerSuccess: true};
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case CLEAR_REGISTER:
      return {
        ...state,
        registerSuccess: null,
      };
    case UPDATE_SUCCESS:
      return {
        ...state,
        error: null,
        user: action.payload,
      };
    case UPDATE_FAILED:
      return {
        ...state,
        error: action.payload,
        user: null,
      };
    default:
      return state;
  }
}