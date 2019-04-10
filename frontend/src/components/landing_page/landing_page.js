import React from 'react';
import { Link } from 'react-router-dom';

class LandingPage extends React.Component {

    componentDidMount() {
        document.title = "Rocket Typer | Home";
        this.props.fetchLeaderboardRaces();
        this.props.fetchRecentRaces();
        this.props.receiveCurrentGame({ gameUUID: "practice", phrase: ["practice", "practice"], type: "practice"});
    }

    getLeaderboardRaces() {
        let races = (
                this.props.leaderboardRaces.map ( (race, idx) => {
                    let date = new Date(race.date);
                    return (
                        <li key={idx} className="flex">
                            <div>{ idx+1 }</div><div><Link to={`/${race.username}`}>{ race.username }</Link></div><div>{ `${date.toLocaleDateString()}` }</div><div>{ race.averageSpeed } wpm</div>
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

    getRecentRaces() {
        let races = (
                this.props.recentRaces.map ( (race, idx) => {
                    let date = new Date(race.date)
                    return (
                        <li key={idx} className="flex">
                            <div>{ `${date.toLocaleDateString()}` }</div><div><Link to={`/${race.winner}`}>{ race.winner }</Link></div><div>{ race.numRaces }</div><div>{ race.topSpeed } wpm</div><div><Link to={`/race/${race._id}`}>Race</Link></div>
                        </li>
                    )
                })
            )
            return (
                <ul>
                    <li className="headers flex">
                        <div className="leaderboard-index">Date</div><div>Winner</div><div>Num Players</div><div> Top Speed </div><div> Details </div>
                    </li>
                    { races }
                </ul>
            )
    }

    render () {
        return (
            <div className="landing-page-container flex">
                <div className="landing-page-leaderboard landing-page-box leaderboard flex-column">
                    <h2>Top 10 Races (All Time)</h2>                        
                    { this.props.leaderboardRaces[0] ? this.getLeaderboardRaces() : <p>No Races Found</p> }
                </div>
                <div className='landing-page-links landing-page-box flex-column'>
                    <Link to={"/game"}>Practice race</Link>
                    <Link to={"/waiting-room"}>Enter a waiting room</Link>
                </div>
                <div className="landing-page-leaderboard landing-page-box leaderboard flex-column">
                    <h2>Recent Races</h2>                        
                    { this.props.recentRaces[0] ? this.getRecentRaces() : <p>No Races Found</p> }
                </div>
            </div>
        )
    }
}

export default LandingPage;