import {REGISTER_SUCCESS, SET_CURRENT_USER, CLEAR_REGISTER} from "../constants";
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
        default:
            return state;
    }
}