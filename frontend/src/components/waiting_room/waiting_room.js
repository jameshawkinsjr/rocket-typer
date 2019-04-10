import React from 'react';
import { randomPhrase } from '../phrases/phrases';

class Race extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            socket: this.props.socket,
            players: {},
            numPlayers: 0,
            username: this.props.user.username ? this.props.user.username : "Guest",
        };
        this.startGame = this.startGame.bind(this);
    }

    componentDidMount() {
        let username = this.state.username;
        let user = this.props.user;
        document.title = "Rocket Typer | Waiting Room";
        
        this.state.socket.emit('joined', {
            user,
            username,
            progress: 0,
        });
        
        this.state.socket.on('newPlayer', (data) => {
            // console.log(`A new player has joined - ${data.username}`);
            let players = this.state.players;
            if (!players[data.playerId]) { 
                this.state.socket.emit('joined', { user, username, });
            };
            players[data.playerId] = data;
            let numPlayers = Object.values(players).length;
            this.setState({ players: players, numPlayers: numPlayers});
        });
        
        this.state.socket.on('playerLeft', (data) => {
            // console.log(`A player has left - ${data.username}`);
            let players = this.state.players;
            delete players[data.playerId];
            this.setState({ players: players});
            let numPlayers = Object.values(this.state.players).length;
            this.setState({ numPlayers: numPlayers});
        });

        this.state.socket.on('playGame', (data) => {
            this.props.receiveCurrentGame(data);
            this.props.history.push("/game");
        });
    }
    
    componentWillUnmount() {
        let username = this.state.username;
        let user = this.props.user;
        this.state.socket.emit('playerDisconnect', {
            username,
            user,
        });
    }

    generateUUID() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
          s4() + '-' + s4() + s4() + s4();
      }

    startGame() {
        let gameId = this.generateUUID();
        let phrase = randomPhrase();
        this.state.socket.emit('startGame', {
            gameId,
            phrase,
            type: "multiplayer",
            players: this.state.players,
        });
    }

    displayPlayers(){
        let players = (
            Object.values(this.state.players).map ( (player, idx) => {
                return (
                    <li key={idx} className="flex">
                        <div>{ idx+1 }</div><div>{ player.username }</div>
                    </li>
                )
            })
        )
        return (
            <ul>
                <li className="headers flex">
                <div className="leaderboard-index">Number</div><div className="leaderboard-index">Player</div>
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
                    { this.state.numPlayers >= 3 ? 
                        (<button className="waiting-room-play-game button" onClick={this.startGame}>Play Game </button>)
                        :
                        <button className="waiting-room-play-game-grey button">Need more players</button>
                    }
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