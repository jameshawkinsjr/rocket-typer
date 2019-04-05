import React from 'react';


class NavBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: this.props.match.params.username || this.props.user.username,
            numRaces: "0",
            avgSpeed: "0",
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
                this.setState( {numRaces: numRaces, avgSpeed: avgSpeed});
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
                        <h2>{`${this.state.username}'s Profile`}<i className="fas fa-rocket"></i></h2>
                    </div>
                    <div className="profile-page-stats flex-column">
                        <div className="profile-page-stats-item" ><h3>Total Races <span>{ this.state.numRaces }</span> </h3></div>
                        <div className="profile-page-stats-item" ><h3>Average Speed <span>{ this.state.avgSpeed }</span></h3></div>
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