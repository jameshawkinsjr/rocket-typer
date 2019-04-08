import React from 'react';
import { Link } from 'react-router-dom';

class Race extends React.Component {

    componentDidMount() {
      document.title = "Rocket Typer | Race";
      this.props.fetchRace(this.props.raceId);
    }

    getRace() {
      let users = (
              this.props.users.map ( (user, idx) => {
                let date = new Date(user.date)
                  return (
                      <li key={idx} className="flex">
                          <div>{ idx+1 }</div><div><Link to={`/${user.username}`}>{ user.username }</Link></div><div>{ user.averageSpeed } wpm</div><div>{ user.accuracy }%</div>
                      </li>
                  )
              })
          )
          return (
              <ul>
                  <li className="headers flex">
                      <div className="leaderboard-index">Place</div><div>User</div><div> Speed</div><div> Accuracy </div>
                  </li>
                  { users }
              </ul>
          )
  }

  render () {
      return (
          <div className="landing-page-container flex">
              <div className="landing-page-leaderboard landing-page-box leaderboard flex-column">
                  <h2>Players</h2>                        
                  { this.props.users[0] ? this.getRace() : <p>No Users Found</p> }
              </div>
          </div>
      )
  }
}

export default Race;