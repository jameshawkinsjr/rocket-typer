import React from 'react';
import SkillLevelContainer from "./skill";
import { Link } from 'react-router-dom';


class Profile extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: this.props.match.params.username || this.props.user.username,
            numRaces: " ",
            avgSpeed: " ",
            maxSpeed: " ",
            memberSince: " ",
        }
        this.logoutCurrentUser = this.logoutCurrentUser.bind(this);
    }

    logoutCurrentUser(e) {
        e.preventDefault();
        this.props.logout();
    }

    componentDidMount() {
        document.title = `Rocket Typer | ${this.state.username}`
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
        this.props.fetchUserDate(this.state.username)
            .then( res => {
                if (res.userStats.data.signupDate){
                    let date = new Date(res.userStats.data.signupDate);
                    this.setState( {memberSince: date.toDateString()});
                }
            })
            .then( () => this.props.closeModal() );
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname){
            this.props.fetchRaces(this.state.username);
        }
    }

    getRaces() {
        let races = (
                this.props.races.map ( (race, idx) => {
                    let date = new Date(race.date);
                    return (
                        <li key={idx} className="flex">
                            <div>{ idx+1 }</div><div>{ `${date.toLocaleDateString()}` }</div><div>{ race.averageSpeed } wpm</div><div>{ race.accuracy }%</div><div><Link to={`/race/${race.raceId}`}>Details</Link></div>
                        </li>
                    )
                })
            )
            return (
                <ul>
                    <li className="headers flex">
                        <div className="leaderboard-index">Rank</div><div> Date</div><div> Speed </div><div> Accuracy </div><div> Race </div>
                    </li>
                    { races }
                </ul>
            )
    }

    render () {
        document.title = `Rocket Typer | ${this.state.username}`
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
                    <div className="profile-info-container flex">
                        <div className="profile-page-info-item flex-column" ><h2>Skill level</h2> <button onClick={() => this.props.openModal({ type: 'ranks'})}><SkillLevelContainer wpm={this.state.avgSpeed}/></button></div>
                        <div className="profile-page-info-item flex-column" ><h2>Member Since</h2> <p>{ this.state.memberSince }</p></div>
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

export default Profile;