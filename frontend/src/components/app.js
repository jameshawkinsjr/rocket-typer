import React from 'react';
import {ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';

import Modal from './modal/modal';
import LandingPageContainer from './landing_page/landing_page_container';
import ProfileContainer from './profile/profile_container';
import NavBarContainer from './navbar/navbar_container';
import GameContainer from './game/game_container';
import RaceContainer from './race/race_container';
import WaitingRoomContainer from './waiting_room/waiting_room_container';

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
                <Route exact path='/waiting-room' component={WaitingRoomContainer}/>
                <Route exact path='/game' component={GameContainer}/>
                <Route exact path='/race/:raceId' component={RaceContainer}/>
                <Route exact path='/:username' component={ProfileContainer}/>
            </Switch>
        </main>
        <footer>
            <div id='stars'></div>
            <div id='stars2'></div>
            <div id='stars3'></div>
            <div id='warpStars'></div>
            <div id='warpStars2'></div>
        </footer>
    </div>
);

export default App;