import {
  CLEAR_ERRORS,
  CLEAR_REGISTER,
  GET_ERRORS,
  REGISTER_SUCCESS,
  SET_CURRENT_USER
} from "../constants";
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

export const registerUser = (userData) => dispatch => {
    axios
        .post('/api/users/register', userData)
        .then(res => {
            console.log(res.data);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: 'success'
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            });
        });
};

export const loginUser = userData => dispatch => {
    axios
        .post('/api/users/login', userData)
        .then(res => {
            console.log(res.data);

            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded))

        })
        .catch(err => {
            console.log(err);
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            });
        });
};

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded,
    }
};

export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
};

export const clearRegister = () => dispatch => {
    dispatch({
      type: CLEAR_REGISTER
    })
};

export const clearErrors = () => dispatch => {
  dispatch({
    type: CLEAR_ERRORS
  })
}