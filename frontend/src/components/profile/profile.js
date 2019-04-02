import React from 'react';


class NavBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            numRaces: 20,
            averageSpeed: 100,
            topTenRaces: [
                [`04-01-2019`, 100], [`04-01-2019`, 97],[`04-01-2019`, 93],[`04-01-2019`, 90],[`04-01-2019`, 88],[`04-01-2019`, 83],[`04-01-2019`, 80],[`04-01-2019`, 80],[`04-01-2019`, 77],[`04-01-2019`, 75]
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

    getRaces() {
       let races = (
            this.state.topTenRaces.map ( (race, idx) => {
                return (
                    <li key={idx} className="flex">
                        <div>{ idx+1 }</div><div>{ race[0] }</div><div>{ race[1] } wpm</div>
                    </li>
                )
            })
        )
        return (
            <ul>
                <li className="headers flex">
                    <div className="leaderboard-index">Place</div><div> Date</div><div> Speed </div>
                </li>
                { races }
            </ul>
        )
    }

    render () {
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
                    <div className="profile-page-leaderboard flex-column">
                        <h2>Your top races</h2>                        
                        { this.getRaces() }
                    </div>
                    </div>
                </div>
        )
    }
}

export default NavBar;