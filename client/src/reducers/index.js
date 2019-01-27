import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import auctionReducer from "./auctionReducer";

export default combineReducers({
    auth: authReducer,
    auctions: auctionReducer,
    errors: errorReducer,
})