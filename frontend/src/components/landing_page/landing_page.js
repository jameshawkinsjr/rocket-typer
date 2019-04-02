import React from 'react';

class LandingPage extends React.Component {

    componentDidMount() {
        this.props.fetchLeaderboardRaces();
    }

    getLeaderboardRaces() {
        let races = (
                this.props.leaderboardRaces.map ( (race, idx) => {
                    let date = new Date(race.date)
                    return (
                        <li key={idx} className="flex">
                            <div>{ idx+1 }</div><div>{ race.username }</div><div>{ `${date.getMonth()}-${date.getDay()}-${date.getFullYear()}` }</div><div>{ race.averageSpeed } wpm</div>
                        </li>
                    )
                })
            )
            return (
                <ul>
                    <li className="headers flex">
                        <div className="leaderboard-index">Rank</div><div>User</div><div> Date</div><div> Speed </div>
                    </li>
                    { races }
                </ul>
            )
    }

    render () {
        return (
            <div className="landing-page-container flex-column">
                <div className="landing-page-leaderboard leaderboard flex-column">
                    <h2>Top 10 Races (All Time)</h2>                        
                    { this.props.leaderboardRaces[0] ? this.getLeaderboardRaces() : "Nah" }
                </div>
            </div>
        )
    }
}

export default LandingPage;