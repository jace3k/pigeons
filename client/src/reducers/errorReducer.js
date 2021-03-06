import {CLEAR_ERRORS, GET_ERRORS} from "../constants";

const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ERRORS:
            return action.payload;
        case CLEAR_ERRORS:
            return {};
        default:
            return state;
    }
}