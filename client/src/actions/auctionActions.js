import {
  BID_AUCTION,
  BID_AUCTION_FAILED, CLEAR_AUCTION, CLEAR_BID,
  CREATE_AUCTION,
  CREATE_AUCTION_FAILED,
  FETCH_AUCTION_DETAILS,
  FETCH_AUCTION_DETAILS_FAILED,
  FETCH_AUCTIONS,
  FETCH_AUCTIONS_FAILED
} from "../constants";

import axios from 'axios';

export const fetchAuctionDetails = (id) => dispatch => {
  axios
    .get(`/api/auctions/${id}`)
    .then(res => {
      console.log(res.data);
      dispatch({
        type: FETCH_AUCTION_DETAILS,
        payload: res.data
      })
    })
    .catch(err => {
      console.log(err.response.data);
      dispatch({
        type: FETCH_AUCTION_DETAILS_FAILED,
        payload: err.response.data,
      })
    })
};

export const createAuction = (auctionData) => dispatch => {
  axios
    .post(`/api/auctions/`, auctionData)
    .then(res => {
      console.log(res.data);
      dispatch({
        type: CREATE_AUCTION,
        payload: res.data
      })
    })
    .catch(err => {
      console.log(err.response.data);
      dispatch({
        type: CREATE_AUCTION_FAILED,
        payload: err.response.data,
      })
    })
};

export const fetchAuctions = () => dispatch => {
  axios
    .get(`/api/auctions/`)
    .then(res => {
      console.log(res.data);
      dispatch({
        type: FETCH_AUCTIONS,
        payload: res.data
      })
    })
    .catch(err => {
      console.log(err.response.data);
      dispatch({
        type: FETCH_AUCTIONS_FAILED,
        payload: err.response.data,
      })
    })
};

export const bidAuction = (id, bid) => dispatch => {
  axios
    .post(`/api/auctions/bid/${id}`, {bid})
    .then(res => {
      console.log(res.data);
      dispatch({
        type: BID_AUCTION,
        payload: res.data
      })
    })
    .catch(err => {
      console.log('biderror', err.response.data);
      dispatch({
        type: BID_AUCTION_FAILED,
        payload: err.response.data,
      })
    })
};


export const clearBid = () => dispatch => {
  dispatch({
    type: CLEAR_BID
  })
};

export const clearAuction = () => dispatch => {
  dispatch({
    type: CLEAR_AUCTION
  })
};