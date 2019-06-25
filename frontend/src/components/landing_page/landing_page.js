import React from 'react';
import { Link } from 'react-router-dom';

class LandingPage extends React.Component {

    componentDidMount() {
        document.title = "Rocket Typer | Home";
        this.props.fetchLeaderboardRaces();
        this.props.fetchRecentRaces();
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
                            <div>{ `${date.toLocaleDateString()}` }</div><div><Link to={`/${race.winner}`}>{ race.winner }</Link></div><div>{ race.numRaces }</div><div>{ race.topSpeed } wpm</div><div><Link to={`/race/${race._id}`}>Details</Link></div>
                        </li>
                    )
                })
            )
            return (
                <ul>
                    <li className="headers flex">
                        <div className="leaderboard-index">Date</div><div>Winner</div><div>Num Players</div><div> Top Speed </div><div> Race </div>
                    </li>
                    { races }
                </ul>
            )
    }

    render () {
        return (
            <div className="landing-page-container flex-column">
                <div className='landing-page-links landing-page-box flex-column'>
                    <h2>Join a typing race</h2>          
                    <div className="flex">
                    <Link to={"/game"}><button className="button">Practice Race</button></Link>
                    <Link to={"/waiting-room"}><button className="button pulse">Live Race</button></Link>
                    </div>
                </div>
                <div className="landing-page-leaderboard-container flex">
                <div className="landing-page-leaderboard landing-page-box leaderboard flex-column">
                    <h2>Global Leaderboard</h2>                        
                    { this.props.leaderboardRaces[0] ? this.getLeaderboardRaces() : <p>No Races Found</p> }
                </div>
                <div className="landing-page-leaderboard landing-page-box leaderboard flex-column">
                    <h2>Recent Races</h2>                        
                    { this.props.recentRaces[0] ? this.getRecentRaces() : <p>No Races Found</p> }
                </div>
                </div>
            </div>
        )
    }
}

export default LandingPage;