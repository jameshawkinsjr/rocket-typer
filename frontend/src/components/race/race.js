import React from 'react';
import { Link } from 'react-router-dom';
import SkillLevelContainer from "../profile/skill";

class Race extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            date: "Loading",
            topSpeed: 0,

        }
    }


    componentDidMount() {
      document.title = "Rocket Typer | Race";
      
      this.props.fetchRace(this.props.raceId)
        .then( res => {
                res.race.data.forEach( user => {
                    let temp;
                    let newDate = new Date(user.date);
                    parseInt(user.averageSpeed) > this.state.topSpeed ? this.setState({topSpeed: user.averageSpeed}) : temp = 0 ;
                    this.setState({date: newDate.toLocaleDateString(), temp});
                });
            });
    }


    getRace() {
        let users = (
                this.props.users.map ( (user, idx) => {
                    return (
                        <li key={idx} className="flex">
                            <div>{ idx+1 }</div><div><Link to={`/${user.username}`}>{ user.username }</Link></div><div>{ user.averageSpeed } wpm</div><div>{ user.accuracy }%</div><div><button onClick={() => this.props.openModal({ type: 'ranks'})}><SkillLevelContainer wpm={user.averageSpeed}/></button></div>
                        </li>
                    )
                })
            )
        return (
            <ul>
                <li className="headers flex">
                    <div className="leaderboard-index">Place</div><div>User</div><div> Speed</div><div> Accuracy </div><div> Skill Level</div>
                </li>
                { users }
            </ul>
        )
  }

  render () {
      return (
            <div className="race-page-container flex-column">
                <div className="profile-page-header" >
                    <h2>Race</h2>   
                </div>
              <div className="race-page-info-container flex">
                    <div className="race-page-info-item flex-column" ><h2>Total Players</h2><p>{ this.props.users.length }</p></div>
                    <div className="race-page-info-item flex-column" ><h2>Winner</h2><p>{ this.props.winner }</p></div>
                    <div className="race-page-info-item flex-column" ><h2>Top Speed</h2><p>{ this.state.topSpeed }wpm</p></div>
                    <div className="race-page-info-item flex-column" ><h2>Date</h2><p>{ this.state.date }</p></div>
                </div>
                <div className="race-page-leaderboard leaderboard flex-column">
                  <h2>Players</h2>                        
                  { this.props.users[0] ? this.getRace() : <p>No Users Found</p> }
                  </div>
            </div>
      )
  }
}

export default Race;