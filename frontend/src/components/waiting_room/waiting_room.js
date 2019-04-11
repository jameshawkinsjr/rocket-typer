import React from 'react';
import { randomPhrase } from '../utils/phrases';
import { generateUUID } from '../utils/generateUUID';

class Race extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            socket: this.props.socket,
            players: {},
            numPlayers: 0,
            username: this.props.user.username ? this.props.user.username : "Guest",
            interval: "",
            timeElapsed: 0,
        };
        this.startGame = this.startGame.bind(this);
        this.incrementTime = this.incrementTime.bind(this);
    }

    componentDidMount() {
        let username = this.state.username;
        let user = this.props.user;
        document.title = "Rocket Typer | Waiting Room";
        this.setState( { interval: setInterval(this.incrementTime, 1000)});
        this.state.socket.emit('joined', {
            user,
            username,
            progress: 0,
        });
        
        this.state.socket.on('newPlayer', (data) => {
            let players = this.state.players;
            if (!players[data.playerId]) { 
                this.state.socket.emit('joined', { user, username, });
            };
            players[data.playerId] = data;
            let numPlayers = Object.values(players).length;
            this.setState({ players: players, numPlayers: numPlayers});
        });
        
        this.state.socket.on('playerLeft', (data) => {
            let players = this.state.players;
            delete players[data.playerId];
            this.setState({ players: players});
            let numPlayers = Object.values(this.state.players).length;
            this.setState({ numPlayers: numPlayers});
        });

        this.state.socket.on('playGame', (data) => {
            this.props.receiveCurrentGame(data);
            this.props.history.push("/game");
            clearInterval(this.state.interval);
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

    incrementTime() {
        let newTime = this.state.timeElapsed + 1;
        this.setState({
          timeElapsed: newTime,
        });
      }

    startGame() {
        let gameId = generateUUID();
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
                    <div className="waiting-room-info-item flex-column" >
                    { (this.state.numPlayers >= 3 || this.state.timeElapsed > 4) ? 
                        (<button className="waiting-room-play-game button" onClick={this.startGame}>Play Game </button>)
                        :
                        <button className="waiting-room-play-game-grey button">{ `Waiting for more players ( ${ Math.max( (5-this.state.timeElapsed), 0)} )`}</button>
                    }
                    </div>
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