import React from 'react';
import {ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';

import Modal from './modal/modal';
import LandingPageContainer from './landing_page/landing_page_container';
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
                <Route exact path='/' component={LandingPageContainer}/>
                <Route exact path='/game' component={Game}/>
                <Route exact path='/:username' component={ProfileContainer}/>
            </Switch>
        </main>
        <footer>
        </footer>
    </div>
);

export default App;

