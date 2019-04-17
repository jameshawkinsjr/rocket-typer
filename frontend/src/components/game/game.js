import React from 'react';
import Rocket from '../rocket/rocket';

class Game extends React.Component {
    constructor(props) {
      super(props);
      let { phrase, phraseLength, socket, gameId, players } = this.props;
      this.state = {
        socket,
        phrase,
        phraseLength, 
        incorrectLetters: [],
        correctLetters: [],
        timeElapsed: 0.001,
        typedEntries: 0,
        players,
        wordsPerMin: 0,
        mistakes: 0,
        countdown: 0,
        countdownTimer: "5...",
        gameId,
        gameWon: false,
        interval: "",
        ignoreKeys: ['Alt', 'Meta', 'Tab', 'Control','Shift','CapsLock', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'PageUp', 'PageDown'],
      };
      this.incrementTime = this.incrementTime.bind(this);
      this.detectKeyPresses = this.detectKeyPresses.bind(this);
      this.sendProgress = this.sendProgress.bind(this);
    }

    componentDidMount() {
      document.title = "Rocket Typer | Game";
      document.addEventListener("keydown", this.detectKeyPresses);
      if (this.props.type === "multiplayer") {
        this.countownTimer();
      }
      this.state.socket.on('receive_progress', (data) => {
        if (this.props.type === 'practice'){
          this.setState({ players: {} });
        }
        if (data.gameId === this.state.gameId){
          let playerProgress = this.state.players;
          playerProgress[data.playerId] = data;
          this.setState({ players: playerProgress });
        }
      });
    }

    componentDidUpdate() {
      this.checkInput();
    }


    componentWillUnmount() {
      document.removeEventListener("keydown", this.detectKeyPresses);
      this.props.clearCurrentGame();      
    }

    detectKeyPresses(e) {
      let newPhrase = this.state.phrase;
      let newIncorrectLetters = this.state.incorrectLetters;
      let newCorrectLetters = this.state.correctLetters;
      let nextLetter;
      if (this.state.countdown === 0){
          if (e.key === 'Enter'){
            this.countownTimer();
          }
        } else if (this.state.countdown === 2){
          if (this.state.typedEntries === 0){
            this.setState( { interval: setInterval(this.incrementTime, 10), timeElapsed: 0.01, });
          }
          if (this.state.ignoreKeys.includes(e.key)){
          } else if (e.key === 'Backspace' || e.key === 'Delete'){
            if (newIncorrectLetters.length){
              nextLetter = newIncorrectLetters.pop();
              newPhrase.unshift(nextLetter);
            } else if (newCorrectLetters.length){
              nextLetter = newCorrectLetters.pop();
              newPhrase.unshift(nextLetter);
            }
          } else if (e.key === newPhrase[0] && newIncorrectLetters.length === 0) {
            nextLetter = newPhrase.shift();
            newCorrectLetters.push(nextLetter);
          } else if ( (e.key !== newPhrase[0] || newIncorrectLetters.length ) && newPhrase.length) {
            nextLetter = newPhrase.shift();
            newIncorrectLetters.push(nextLetter);
            this.setState({ mistakes: this.state.mistakes + 1 });
          }
          this.setState({ 
            incorrectLetters: newIncorrectLetters,
            correctLetters: newCorrectLetters,
            phrase: newPhrase,
            typedEntries: this.state.typedEntries+1,
          });
          this.sendProgress();
      }
    }

    checkInput() {
      if (!this.state.phrase.length && !this.state.incorrectLetters.length && !this.state.gameWon) {
        let time = this.state.timeElapsed;
        let accuracy = Math.max( Math.floor((this.state.correctLetters.length - this.state.mistakes) / (this.state.correctLetters.length || 0.0001) * 100), 0).toString()
        this.setState({
          gameWon: true,
          wordsPerMin: Math.floor((this.state.phraseLength / 5) / (time / 60))
        });
        if (this.props.loggedIn && this.props.type !== 'practice'){
          this.props.saveRace({
            user: this.props.user.id,
            username: this.props.user.username,
            averageSpeed: Math.floor((this.state.phraseLength / 5) / (time / 60)).toString(),
            accuracy: accuracy,
            gameId: this.state.gameId,
          });
        }
        clearInterval(this.state.interval);
        document.removeEventListener("keydown", this.detectKeyPresses);
        this.props.openModal({ type: 'gameStats', wordsPerMin: this.state.wordsPerMin, time: this.state.timeElapsed, accuracy: accuracy, phraseOrigin: this.props.phraseOrigin});
      }
    }

    sendProgress() {
      let username = this.props.user.username ? this.props.user.username : "Guest";
      let progress = (this.state.correctLetters.length / this.state.phraseLength * 100).toFixed(2);
      let gameId = this.state.gameId;
      this.state.socket.emit('send_progress', {
        gameId,
        username,
        progress 
      });
    }

    countownTimer() {
      this.setState( { countdown: 1 });
      setTimeout( () => this.setState( {countdownTimer: "4..." }), 1000);
      setTimeout( () => this.setState( {countdownTimer: "3..." }), 2000);
      setTimeout( () => this.setState( {countdownTimer: "2..." }), 3000);
      setTimeout( () => this.setState( {countdownTimer: "1..." }), 4000);
      setTimeout( () => this.setState( {countdown: 2 }), 5000);
    }

    incrementTime() {
      let newTime = this.state.timeElapsed+0.01;
      this.setState({
        timeElapsed: newTime,
        wordsPerMin: Math.floor(( (this.state.correctLetters.length || 0) / 5) / (newTime / 60)),
      });
    }

    render () {      

      let rockets = (
        <div>
          { 
            Object.values(this.state.players).map ( player => (
              <Rocket key={player.playerId} playerId={player.playerId} username={player.username} progress={player.progress}/>
            ))
          }     
        </div>
      )

      let countdown1 = (
        <>
          <div className="countdown flex">
          <h1>Press <span>Enter</span> to get started</h1>
          </div>
        </>
      )

      let countdownMulti = (
        <>
          <div className="countdown flex">
          <h1>Get Ready</h1>
          </div>
        </>
      )

      let countdown2 = (
        <>
          <div className="countdown flex-column">
            <h1> Start typing in:</h1>
            <h1>{this.state.countdownTimer}</h1>
            <h3>Tip: If you make a mistake, press <span>Backspace</span> to correct it</h3>
          </div>
        </>
      )

      let gameRender = (
            <>
            <div className="answer-phrase flex">
                        <pre>
                          { this.state.correctLetters.length ? (<span className="green">{ this.state.correctLetters.join("")}</span>) : "" }
                          { this.state.incorrectLetters.length ? (<span className="red">{ this.state.incorrectLetters.join("") }</span>) : "" }
                          <span className="regular" >{ this.state.phrase.join("") || ""} </span>
                        </pre>
                    </div>
                    <div className={`game-stats flex ${this.state.gameWon ? "finished": ""}`}>
                      <p className={`wpm flex`}>Words per minute: {this.state.wordsPerMin}</p>
                      <p className={`wpm flex`}>Time: <div>{this.state.timeElapsed.toFixed(1)}</div> seconds</p>
                      <p className={`wpm flex`}>Accuracy: { `${Math.max( Math.floor((this.state.correctLetters.length - this.state.mistakes) / (this.state.correctLetters.length || 0.0001) * 100), 0)}%` }</p>
              </div>
            </>
          )

        return (
          <>
            <div className="game-area-parent flex-column">
              <div className="progress-meter flex">
                  
                  <img className="earth" alt='earth' src="./assets/earth.png"/>
                  { rockets }
                  <img className="mars" alt='mars' src="./assets/mars.png"/>
              </div>
              <div className="game-area">
                { (this.props.type === "multiplayer" && this.state.countdown === 0) ? countdownMulti : this.state.countdown === 0 ?  countdown1 : this.state.countdown === 1 ? countdown2 : gameRender }
              </div>
            </div>
          </>
        )
    }
}

export default Game;