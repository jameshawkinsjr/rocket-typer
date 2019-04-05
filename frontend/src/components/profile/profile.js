import React from 'react';


class NavBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: this.props.match.params.username || this.props.user.username,
            numRaces: "0",
            avgSpeed: "0",
            maxSpeed: "0",
        }
        this.logoutCurrentUser = this.logoutCurrentUser.bind(this);
    }

    logoutCurrentUser(e) {
        e.preventDefault();
        this.props.logout();
    }

    componentDidMount() {
        this.props.fetchRaces(this.state.username);
        this.props.fetchUserStats(this.state.username)
        .then( res => {
            if (res.userStats.data[0]){
                let numRaces = Math.floor(res.userStats.data[0].numRaces);
                let avgSpeed = Math.floor(res.userStats.data[0].avgSpeed);
                let maxSpeed = Math.floor(res.userStats.data[0].maxSpeed);
                this.setState( {numRaces: numRaces, avgSpeed: avgSpeed, maxSpeed: maxSpeed});
            }
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname){
            this.props.fetchRaces(this.state.username);
        }
    }

    getRaces() {
        let races = (
                this.props.races.map ( (race, idx) => {
                    let date = new Date(race.date)
                    return (
                        <li key={idx} className="flex">
                            <div>{ idx+1 }</div><div>{ `${date.getMonth()}-${date.getDay()}-${date.getFullYear()}` }</div><div>{ race.averageSpeed } wpm</div><div>{ race.accuracy }%</div>
                        </li>
                    )
                })
            )
            return (
                <ul>
                    <li className="headers flex">
                        <div className="leaderboard-index">Rank</div><div> Date</div><div> Speed </div><div> Accuracy </div>
                    </li>
                    { races }
                </ul>
            )
    }

    render () {
        { document.title = `Rocket Typer | ${this.state.username}`}
        return (
            <div className="profile-container flex-column">
                <div className="profile-page flex-column">
                    { this.props.match.url === '/profile' ? 
                        (<button className="profile-page-logout button" onClick={this.logoutCurrentUser}>Logout </button>)
                        :
                        ""
                    }
                    <div className="profile-page-header" >
                        <h2>{`${this.state.username}'s Profile`}</h2>
                    </div>
                    <div className="profile-page-stats flex">
                        <div className="profile-page-stats-item flex-column" ><h3>Total Races</h3><h3>{ this.state.numRaces }</h3></div>
                        <div className="profile-page-stats-item flex-column" ><h3>Average Speed</h3> <h3>{ this.state.avgSpeed } wpm</h3></div>
                        <div className="profile-page-stats-item flex-column" ><h3>Max Speed</h3><h3>{ this.state.maxSpeed } wpm</h3></div>
                    </div>
                    <div className="profile-page-leaderboard leaderboard flex-column">
                        <h2>Top 10 races</h2>                        
                        { this.props.races[0] ? this.getRaces() : <h3>N/A</h3> }
                    </div>
                    </div>
                </div>
        )
    }
}

export default NavBar;