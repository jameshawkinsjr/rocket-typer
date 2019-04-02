import React from 'react';


class NavBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            numRaces: "Loading",
            avgSpeed: "Loading"
        }
        this.logoutCurrentUser = this.logoutCurrentUser.bind(this);
    }

    logoutCurrentUser(e) {
        e.preventDefault();
        this.props.logout();
    }

    componentDidMount() {
        this.props.fetchRaces(this.props.user.username);
        this.props.fetchUserStats(this.props.user.username)
        .then( res => {
            let numRaces = res.userStats.data[0].numRaces;
            let avgSpeed = res.userStats.data[0].avgSpeed;
            this.setState( {numRaces: numRaces, avgSpeed: avgSpeed})
        });
    }

    getRaces() {
        let races = (
                this.props.races.map ( (race, idx) => {
                    let date = new Date(race.date)
                    return (
                        <li key={idx} className="flex">
                            <div>{ idx+1 }</div><div>{ `${date.getMonth()}-${date.getDay()}-${date.getFullYear()}` }</div><div>{ race.averageSpeed } wpm</div>
                        </li>
                    )
                })
            )
            return (
                <ul>
                    <li className="headers flex">
                        <div className="leaderboard-index">Rank</div><div> Date</div><div> Speed </div>
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
                        <div className="profile-page-stats-item" ><h3>Total Races <span>{ this.state.numRaces }</span> </h3></div>
                        <div className="profile-page-stats-item" ><h3>Average Speed <span>{ this.state.avgSpeed }</span></h3></div>
                    </div>
                    <div className="profile-page-leaderboard leaderboard flex-column">
                        <h2>Your top races</h2>                        
                        { this.props.races[0] ? this.getRaces() : "Loading" }
                    </div>
                    </div>
                </div>
        )
    }
}

export default NavBar;