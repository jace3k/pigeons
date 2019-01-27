import {
  CREATE_AUCTION,
  CREATE_AUCTION_FAILED,
  FETCH_AUCTION_DETAILS,
  FETCH_AUCTION_DETAILS_FAILED,
  FETCH_AUCTIONS, FETCH_AUCTIONS_FAILED
} from "../constants";

const initialState = {
  current: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_AUCTION_DETAILS:
      return {
        error: null,
        current: action.payload,
      };
    case FETCH_AUCTION_DETAILS_FAILED:
      return {
        error: action.payload,
        current: null,
      };
    case CREATE_AUCTION:
      return {
        error: null,
        current: action.payload,
      };
    case CREATE_AUCTION_FAILED:
      return {
        error: action.payload,
        current: null,
      };
    case FETCH_AUCTIONS:
      return {
        error: null,
        all: action.payload,
      };
    case FETCH_AUCTIONS_FAILED:
      return {
        error: action.payload,
        all: []
      };
    default:
      return state;
  }
}