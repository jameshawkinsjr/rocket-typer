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
        gameWon: false,
        interval: "",
        ignoreKeys: ['Alt', 'Meta', 'Tab', 'Control','Shift','CapsLock', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'PageUp', 'PageDown']
      };
      this.incrementTime = this.incrementTime.bind(this);
      this.detectKeyPresses = this.detectKeyPresses.bind(this);
    }

    checkInput() {
      if (!this.state.phrase.length && !this.state.incorrectLetters.length && !this.state.gameWon) {
        console.log(this.state.phraseLength, this.state.timeElapsed);
        this.setState({
          gameWon: true,
          wordsPerMin: Math.floor((this.state.phraseLength / 5) / (this.state.timeElapsed / 60))
        });
        this.props.saveRace({
          user: this.props.user.id,
          username: this.props.user.username,
          averageSpeed: Math.floor((this.state.phraseLength / 5) / (this.state.timeElapsed / 60)).toString(),
          accuracy: Math.max( Math.floor((this.state.correctLetters.length - this.state.mistakes) / (this.state.correctLetters.length || 0.0001) * 100), 0).toString(),
        })
        clearInterval(this.state.interval);
      }
    }

    componentDidUpdate() {
      this.checkInput();
    }

    componentDidMount() {
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
      if (this.state.typedEntries === 0){
        this.setState( { interval: setInterval(this.incrementTime, 10), timeElapsed: 0.01, });
      }
      console.log(e.key);
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
    }

    incrementTime() {
      let newTime = this.state.timeElapsed+0.01;
      this.setState({
        timeElapsed: newTime,
        wordsPerMin: Math.floor(( (this.state.correctLetters.length || 0) / 5) / (newTime / 60)),
      });
    }

    render () {

        return (
          <>
            <div className="game-area-parent flex-column">
              <div className="game-area">
                <div className="answer-phrase flex">
                    <pre>
                      { this.state.correctLetters.length ? (<span className="green">{ this.state.correctLetters.join("")}</span>) : "" }
                      { this.state.incorrectLetters.length ? (<span className="red">{ this.state.incorrectLetters.join("") }</span>) : "" }
                      <span className="regular" >{ this.state.phrase.join("") || ""} </span>
                    </pre>
                </div>
                { this.gameWon ? <p>You finished!</p> : ""}
                <p className="wpm flex">Words per minute: {this.state.wordsPerMin}</p>
                <p className="wpm flex">Time: {Math.floor(this.state.timeElapsed)} seconds</p>
                <p className="wpm flex">Accuracy: { `${Math.max( Math.floor((this.state.correctLetters.length - this.state.mistakes) / (this.state.correctLetters.length || 0.0001) * 100), 0)}%` }</p>
              </div>
              <Rocket totalLength={this.state.phraseLength} currentProgress={this.state.correctLetters.length} />
            </div>
          </>
        )
    }
}

export default Game;