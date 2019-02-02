import {
  LIKE_USER, LIKE_USER_FAILED,
  DISLIKE_USER, DISLIKE_USER_FAILED,
  FETCH_USER_DETAILS, FETCH_USER_DETAILS_FAILED,
  CLEAR_LIKES,
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
  axios
    .get(`/api/users/profile/${name}`)
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