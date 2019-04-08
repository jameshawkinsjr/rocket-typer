import React from 'react';
import Rocket from '../rocket/rocket';

class Game extends React.Component {
    constructor(props) {
      super(props);
      let { phrase, phraseLength } = this.props;
      this.state = {
        phrase,
        phraseLength, 
        incorrectLetters: [],
        correctLetters: [],
        timeElapsed: 0.001,
        typedEntries: 0,
        wordsPerMin: 0,
        mistakes: 0,
        countdown: 0,
        countdownTimer: "3...",
        gameId: this.generateUUID(),
        gameWon: false,
        interval: "",
        ignoreKeys: ['Alt', 'Meta', 'Tab', 'Control','Shift','CapsLock', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'PageUp', 'PageDown']
      };
      this.incrementTime = this.incrementTime.bind(this);
      this.detectKeyPresses = this.detectKeyPresses.bind(this);
    }

    checkInput() {
      if (!this.state.phrase.length && !this.state.incorrectLetters.length && !this.state.gameWon) {
        let time = this.state.timeElapsed;
        let accuracy = Math.max( Math.floor((this.state.correctLetters.length - this.state.mistakes) / (this.state.correctLetters.length || 0.0001) * 100), 0).toString()
        this.setState({
          gameWon: true,
          wordsPerMin: Math.floor((this.state.phraseLength / 5) / (time / 60))
        });
        if (this.props.loggedIn){
          this.props.saveRace({
            user: this.props.user.id,
            username: this.props.user.username,
            averageSpeed: Math.floor((this.state.phraseLength / 5) / (time / 60)).toString(),
            accuracy: accuracy,
            gameId: this.state.gameId,
          });
          };
        clearInterval(this.state.interval);
        this.props.openModal({ type: 'gameStats', wordsPerMin: this.state.wordsPerMin, time: this.state.timeElapsed, accuracy: accuracy, phraseOrigin: this.props.phraseOrigin});
      }
    }

    componentDidUpdate() {
      this.checkInput();
    }

    componentDidMount() {
      document.title = "Rocket Typer | Game"
      document.addEventListener("keydown", this.detectKeyPresses);
      
    }

    componentWillUnmount() {
      document.removeEventListener("keydown", this.detectKeyPresses);
    }

    detectKeyPresses(e) {
      let newPhrase = this.state.phrase;
      let newIncorrectLetters = this.state.incorrectLetters;
      let newCorrectLetters = this.state.correctLetters;
      let nextLetter;
      if (this.state.countdown === 0){
          if (e.key === 'Enter'){
            this.setState( { countdown: 1 });
            setTimeout( () => this.setState( {countdownTimer: "2..." }), 1000);
            setTimeout( () => this.setState( {countdownTimer: "1..." }), 2000);
            setTimeout( () => this.setState( {countdown: 2 }), 3000);
          }
        } else {
          if (this.state.typedEntries === 0){
            // Start Timer
            this.setState( { interval: setInterval(this.incrementTime, 10), timeElapsed: 0.01, });
          }
          if (this.state.ignoreKeys.includes(e.key)){
            // Do Nothing
          } else if (e.key === 'Backspace' || e.key === 'Delete'){
            // Go backwards in phrase, if you can
            if (newIncorrectLetters.length){
              nextLetter = newIncorrectLetters.pop();
              newPhrase.unshift(nextLetter);
            } else if (newCorrectLetters.length){
              nextLetter = newCorrectLetters.pop();
              newPhrase.unshift(nextLetter);
            }
          } else if (e.key === newPhrase[0] && newIncorrectLetters.length === 0) {
            // Move next letter to correct array
            nextLetter = newPhrase.shift();
            newCorrectLetters.push(nextLetter);
          } else if ( (e.key !== newPhrase[0] || newIncorrectLetters.length ) && newPhrase.length) {
            // Move next letter to incorrect array
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
      }
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

    incrementTime() {
      let newTime = this.state.timeElapsed+0.01;
      this.setState({
        timeElapsed: newTime,
        wordsPerMin: Math.floor(( (this.state.correctLetters.length || 0) / 5) / (newTime / 60)),
      });
    }

    render () {      

      let countdown1 = (
        <>
          <div className="countdown flex">
          <h1>Press <span>Enter</span> to get started</h1>
          </div>
        </>
      )

      let countdown2 = (
        <>
          <div className="countdown flex">
          <h1>{this.state.countdownTimer}</h1>
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
                      <p className={`wpm flex`}>Game ID: {this.state.gameId}</p>
                      <p className={`wpm flex`}>Words per minute: {this.state.wordsPerMin}</p>
                      <p className={`wpm flex`}>Time: {this.state.timeElapsed.toFixed(1)} seconds</p>
                      <p className={`wpm flex`}>Accuracy: { `${Math.max( Math.floor((this.state.correctLetters.length - this.state.mistakes) / (this.state.correctLetters.length || 0.0001) * 100), 0)}%` }</p>
              </div>
            </>
          )

        return (
          <>
            <div className="game-area-parent flex-column">
              <div className="progress-meter flex">
                  <img className="earth" alt='earth' src="./assets/earth.png"/>
                  <Rocket totalLength={this.state.phraseLength} currentProgress={this.state.correctLetters.length} />
                  <img className="mars" alt='mars' src="./assets/mars.png"/>
              </div>
              <div className="game-area">
                { this.state.countdown === 0 ? countdown1 : this.state.countdown === 1 ? countdown2 : gameRender }
              </div>
            </div>
          </>
        )
    }
}

export default Game;