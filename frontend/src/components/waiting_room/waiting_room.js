import React from 'react';

class Race extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            socket: this.props.socket,
            players: [this.props.user.username],
            numPlayers: 0,
            username: this.props.user.username || "Guest",
        };
    }

    componentDidMount() {
        let username = this.state.username;
        document.title = "Rocket Typer | Waiting Room";
        
        this.state.socket.emit('joined', {
            username,
        });

        this.state.socket.on('receive_progress', (data) => {
            console.log(data.username, data.progress);
        });
        
        this.state.socket.on('newPlayer', (data) => {
            console.log(`A new player has joined ${data.username}`);
            let players = this.state.players;
            players.push(data.username);
            this.setState({ players: players});
            let numPlayers = Object.values(this.state.players).length;
            this.setState({ numPlayers: numPlayers});
        });
    }
    
    componentDidUpdate() {
    }

    displayPlayers(){
        let players = (
            this.state.players.map ( (player, idx) => {
                return (
                    <li key={idx} className="flex">
                        <div>{ idx+1 }</div><div>{ player }</div>
                    </li>
                )
            })
        )
        return (
            <ul>
                <li className="headers flex">
                <div className="leaderboard-index">Number</div><div className="leaderboard-index">Player Id</div>
                </li>
                { players }
            </ul>
        )
    }

    render () {
      return (
            <div className="waiting-room-container flex-column">
                <div className="waiting-room-header" >
                    <h2>Waiting Room</h2>   
                </div>
                <div className="waiting-room-info-container flex">
                    <div className="waiting-room-info-item flex-column" ><h2>Total Players</h2><p>{ this.state.numPlayers }</p></div>
                </div>
                <div className="waiting-room-player-list leaderboard flex-column">
                  <h2>Players</h2>                        
                  { this.state.players ? this.displayPlayers() : <p>No Users Found</p> }
                </div>
            </div>
      )
    }
}

export default Race;