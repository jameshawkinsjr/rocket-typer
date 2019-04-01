import React from 'react';
import { Link } from 'react-router-dom';


class NavBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            numRaces: 20,
            averageSpeed: 100,
            topTenRaces: [
                [`04-01-2019`, 20], [`04-01-2019`, 20],[`04-01-2019`, 20],[`04-01-2019`, 20],[`04-01-2019`, 20],[`04-01-2019`, 20],[`04-01-2019`, 20],[`04-01-2019`, 20],[`04-01-2019`, 20],[`04-01-2019`, 20]
            ]
        };
        this.logoutCurrentUser = this.logoutCurrentUser.bind(this);
    }

    logoutCurrentUser(e) {
        e.preventDefault();
        this.props.logout();
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname){
            this.getLinks();
        }
    }

    render () {

        let races = (
            this.state.topTenRaces.map ( race => {
                return (
                    <li className="flex">
                        <div>{`Date: ${race[0]}`}</div><div>{`Speed: ${race[1]} WPM`}</div>
                    </li>
                )
            })
        )
        return (
            <div className="profile-container flex-column">
                <div className="profile-page flex-column">
                    <button className="profile-page-logout button" onClick={this.logoutCurrentUser}>Logout </button>
                    <div className="profile-page-header" >
                        <h2>{this.props.user.username} <i className="fas fa-rocket"></i></h2>
                    </div>
                    <div className="profile-page-stats flex-column">
                        <div className="profile-page-stats-item" >Total Races <span>{ this.state.numRaces }</span></div>
                        <div className="profile-page-stats-item" >Account Average <span>{ this.state.averageSpeed }</span></div>
                    </div>
                    <div className="profile-page-leaderboard">
                        Top 10 races 
                        <ul>
                        { races }
                        </ul>
                    </div>
                    </div>
                </div>
        )
    }
}

export default NavBar;