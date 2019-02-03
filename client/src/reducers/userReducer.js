import {
  LIKE_USER,
  LIKE_USER_FAILED,
  DISLIKE_USER,
  DISLIKE_USER_FAILED,
  CLEAR_LIKES, FETCH_USER_DETAILS, FETCH_USER_DETAILS_FAILED
} from "../constants";

const initialState = {
  like: false,
  dislike: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LIKE_USER:
      return {
        error: null,
        like: action.payload.like,
        dislike: false,
      };
    case LIKE_USER_FAILED:
      return {
        error: action.payload,
        like: false,
        dislike: false,
      };
    case DISLIKE_USER:
      return {
        error: null,
        dislike: action.payload.dislike,
        like: false,
      };
    case DISLIKE_USER_FAILED:
      return {
        error: action.payload,
        dislike: false,
        like: false,
      };
    case CLEAR_LIKES:
      return {
        error: null,
        dislike: null,
        like: null,
      };
    case FETCH_USER_DETAILS:
      return {
        error: null,
        user: action.payload,
      };
    case FETCH_USER_DETAILS_FAILED:
      return {
        error: action.payload,
        user: null,
      };
    default:
      return state;
  }
}