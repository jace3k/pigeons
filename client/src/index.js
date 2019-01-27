import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import store from './store';
import {SnackbarProvider} from 'notistack';

import setAuthToken from "./utils/setAuthToken";
import jwt_decode from 'jwt-decode';
import {setCurrentUser, logoutUser} from "./actions/authActions";

if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decoded));

    if (decoded.exp < (Date.now()/1000)) {
        store.dispatch(logoutUser());
        window.location.href = '/login'
    }
}

const app = (
    <Provider store={store}>
        <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
            <App/>
        </SnackbarProvider>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
