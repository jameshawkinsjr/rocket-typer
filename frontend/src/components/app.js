import React from 'react';
import {AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';

import Modal from './modal/modal';
import LandingPage from './landing_page';
import ProfileContainer from './profile/profile_container';
import NavBarContainer from './navbar/navbar_container';
import Game from './game/game_container';


const App = () => (
    <div className="app">
        <Modal />
        <header>
        </header>
        <main>
            <NavBarContainer />
            <Switch>
                <ProtectedRoute exact path='/profile' component={ProfileContainer}/>
                <Route exact path='/' component={LandingPage}/>
                <Route exact path='/game' component={Game}/>
            </Switch>
        </main>
        <footer>
        </footer>
    </div>
);

export default App;

