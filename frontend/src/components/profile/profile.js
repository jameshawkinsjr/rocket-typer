import React from 'react';


class NavBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            numRaces: 20,
            averageSpeed: 100,
        };
        this.logoutCurrentUser = this.logoutCurrentUser.bind(this);
    }

    logoutCurrentUser(e) {
        e.preventDefault();
        this.props.logout();
    }

    componentDidMount() {
        this.props.fetchRaces(this.props.user.id);
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
                        { this.props.races.length ? this.getRaces() : "" }
                    </div>
                    </div>
                </div>
        )
    }
}

export default NavBar;