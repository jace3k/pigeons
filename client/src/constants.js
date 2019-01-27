import React from "react";
import primary from '@material-ui/core/colors/deepPurple';
import secondary from '@material-ui/core/colors/orange';

export const GET_ERRORS = 'GET_ERRORS';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export const FETCH_AUCTION_DETAILS = 'FETCH_AUCTION_DETAILS';
export const FETCH_AUCTION_DETAILS_FAILED = 'FETCH_AUCTION_DETAILS_FAILED';

export const CREATE_AUCTION = 'CREATE_AUCTION';
export const CREATE_AUCTION_FAILED = 'CREATE_AUCTION_FAILED';

export const FETCH_AUCTIONS = 'FETCH_AUCTIONS';
export const FETCH_AUCTIONS_FAILED = 'FETCH_AUCTIONS_FAILED';
export const TITLE = 'Pigeon Aukcjia';
export const LOGIN_ELEMENT = (<div style={{textAlign: 'center', width: '100%', color: '#AAA'}}>&copy; {TITLE}.</div>);

export const PRIMARY_COLOR = primary[600];
export const SECONDARY_COLOR = secondary[600];