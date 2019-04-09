import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './app';
import SocketContext from '../api/socket-context';
import openSocket from 'socket.io-client';

const url = `${window.location.hostname}:${window.location.port}`;
const socket = openSocket(url);

const Root = ( { store } ) => (
    <SocketContext.Provider value={socket}>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </SocketContext.Provider>
);

export default Root;