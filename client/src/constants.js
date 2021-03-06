import React from "react";
import primary from '@material-ui/core/colors/deepPurple';
import secondary from '@material-ui/core/colors/orange';

export const GET_ERRORS = 'GET_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const CLEAR_REGISTER = 'CLEAR_REGISTER';

export const FETCH_AUCTION_DETAILS = 'FETCH_AUCTION_DETAILS';
export const FETCH_AUCTION_DETAILS_FAILED = 'FETCH_AUCTION_DETAILS_FAILED';

export const CREATE_AUCTION = 'CREATE_AUCTION';
export const CREATE_AUCTION_FAILED = 'CREATE_AUCTION_FAILED';

export const FETCH_AUCTIONS = 'FETCH_AUCTIONS';
export const FETCH_AUCTIONS_FAILED = 'FETCH_AUCTIONS_FAILED';

export const LIKE_USER = 'LIKE_USER';
export const DISLIKE_USER = 'DISLIKE_USER';
export const LIKE_USER_FAILED = 'LIKE_USER_FAILED';
export const DISLIKE_USER_FAILED = 'DISLIKE_USER_FAILED';

export const FETCH_USER_DETAILS = 'FETCH_USER_DETAILS';
export const FETCH_USER_DETAILS_FAILED = 'FETCH_USER_DETAILS_FAILED';

export const FETCH_USER_AUCTIONS = 'FETCH_USER_AUCTIONS';
export const FETCH_USER_AUCTIONS_FAILED = 'FETCH_USER_AUCTIONS_FAILED';

export const BID_AUCTION = 'BID_AUCTION';
export const BID_AUCTION_FAILED = 'BID_AUCTION_FAILED';

export const CLEAR_LIKES = 'CLEAR_LIKES';
export const CLEAR_BID = 'CLEAR_BID';
export const CLEAR_AUCTION = 'CLEAR_AUCTION';

export const UPDATE_SUCCESS = 'UPDATE_SUCCESS';
export const UPDATE_FAILED = 'UPDATE_FAILED';
export const UPDATE_CLEAR = 'UPDATE_CLEAR';

export const AUCTION_PUSH_IMAGE_FAILED = 'AUCTION_PUSH_IMAGE_FAILED';


export const TITLE = 'Aukcje Gołębi';
export const LOGIN_ELEMENT = (<div style={{textAlign: 'center', width: '100%', color: '#AAA'}}>&copy; {TITLE}.</div>);

export const PRIMARY_COLOR = primary[600];
export const SECONDARY_COLOR = secondary[600];