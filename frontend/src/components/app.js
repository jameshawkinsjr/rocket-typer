import React from 'react';
// import {AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';

import Modal from './modal/modal';
import LandingPage from './landing_page';
import NavBarContainer from './navbar/navbar_container';
import Game from './game/game_container';


const App = () => (
    <div>
        <Modal />
        <header>
        </header>
        <main>
            <NavBarContainer />
            <Switch>
                <Route exact path='/' component={LandingPage}/>
                <Route exact path='/game' component={Game}/>
                <Route exact path='/test' component={NavBarContainer}/>
            </Switch>
        </main>
        <footer>
        </footer>
    </div>
);

export default App;
