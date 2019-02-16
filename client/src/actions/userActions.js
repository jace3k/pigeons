import {
  LIKE_USER, LIKE_USER_FAILED,
  DISLIKE_USER, DISLIKE_USER_FAILED,
  FETCH_USER_DETAILS, FETCH_USER_DETAILS_FAILED,
  CLEAR_LIKES, FETCH_USER_AUCTIONS, FETCH_USER_AUCTIONS_FAILED, UPDATE_SUCCESS, UPDATE_FAILED, UPDATE_CLEAR,
} from "../constants";

import axios from 'axios';

export const likeUser = user => dispatch => {
  axios
    .get(`/api/users/like/${user}`)
    .then(res => {
      console.log(res.data);
      dispatch({
        type: LIKE_USER,
        payload: res.data,
      })
    })
    .catch(err => {
      console.log(err.response.data);
      dispatch({
        type: LIKE_USER_FAILED,
        payload: err.response.data,
      })
    })
};

export const dislikeUser = user => dispatch => {
  axios
    .get(`/api/users/dislike/${user}`)
    .then(res => {
      console.log(res.data);
      dispatch({
        type: DISLIKE_USER,
        payload: res.data,
      })
    })
    .catch(err => {
      console.log(err.response.data);
      dispatch({
        type: DISLIKE_USER_FAILED,
        payload: err.response.data,
      })
    })
};

export const clearLikes = () => dispatch => {
  dispatch({
    type: CLEAR_LIKES
  })
};

export const fetchUserDetails = (name) => dispatch => {
  let path;
  if (name) {
    path = `/api/users/profile/${name}`;
  } else {
    path = `/api/users/profile`;
  }

  axios
    .get(path)
    .then(res => {
      console.log(res.data);
      dispatch({
        type: FETCH_USER_DETAILS,
        payload: res.data,
      })
    })
    .catch(err => {
      console.log(err.response.data);
      dispatch({
        type: FETCH_USER_DETAILS_FAILED,
        payload: err.response.data,
      })
    })
};

export const fetchUserAuctions = (id) => dispatch => {
  axios
    .get(`/api/users/${id}/auctions`)
    .then(res => {
      console.log('fetchUserAuctions', res.data);
      dispatch({
        type: FETCH_USER_AUCTIONS,
        payload: res.data,
      })
    })
    .catch(err => {
      console.log(err.response.data);
      dispatch({
        type: FETCH_USER_AUCTIONS_FAILED,
        payload: err.response.data,
      })
    })
};

export const updateUser = (userData) => dispatch => {
  axios
    .post('/api/users/update', userData)
    .then(res => {
      dispatch({
        type: UPDATE_SUCCESS,
        payload: res.data,
      });
      dispatch({
        type: UPDATE_CLEAR,
      })
    })
    .catch(err => {
      dispatch({
        type: UPDATE_FAILED,
        payload: err.response.data,
      });
    });
};