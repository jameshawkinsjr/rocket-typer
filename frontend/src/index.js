import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import './stylesheets/application.scss';
import configureStore from './store/store';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './util/session_api_util';
import { logout } from './actions/session_actions';

document.addEventListener('DOMContentLoaded', () => {
    let store;

    if (localStorage.jwtToken) {
        setAuthToken(localStorage.jwtToken);
        const decodedUser = jwt_decode(localStorage.jwtToken);
        const preloadedState = { session: {isAuthenticated: true, user: decodedUser } };
        const currentTime = Date.now() / 1000;

        store = configureStore(preloadedState);
        if (decodedUser.exp < currentTime) {
            store.dispatch(logout());
        }
    } else {
        store = configureStore( {} );
    }

    const root = document.getElementById('root');
    ReactDOM.render( <Root store={store} />, root);
})