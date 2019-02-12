import {
  BID_AUCTION, BID_AUCTION_FAILED, CLEAR_AUCTION, CLEAR_BID,
  CREATE_AUCTION,
  CREATE_AUCTION_FAILED,
  FETCH_AUCTION_DETAILS,
  FETCH_AUCTION_DETAILS_FAILED,
  FETCH_AUCTIONS, FETCH_AUCTIONS_FAILED
} from "../constants";

const initialState = {
  success: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_AUCTION_DETAILS:
      return {
        ...state,
        error: null,
        current: action.payload,
      };
    case FETCH_AUCTION_DETAILS_FAILED:
      return {
        ...state,
        error: action.payload,
        current: null,
      };
    case CREATE_AUCTION:
      return {
        ...state,
        error: null,
        newAuction: action.payload,
        success: true
      };
    case CREATE_AUCTION_FAILED:
      return {
        ...state,
        error: action.payload,
        newAuction: null,
        success: false,
      };
    case FETCH_AUCTIONS:
      return {
        ...state,
        error: null,
        all: action.payload,
      };
    case FETCH_AUCTIONS_FAILED:
      return {
        ...state,
        error: action.payload,
        all: []
      };
    case BID_AUCTION:
      return {
        ...state,
        error: null,
        bid: action.payload,
      };
    case BID_AUCTION_FAILED:
      return {
        ...state,
        error: action.payload,
        bid: null,
      };
    case CLEAR_BID:
      return {
        ...state,
        bid: null,
      };
    case CLEAR_AUCTION:
      return {
        ...state,
        current: null,
      };
    default:
      return state;
  }
}