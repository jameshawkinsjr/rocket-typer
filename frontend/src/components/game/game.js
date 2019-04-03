import React from 'react';
// import { Wpm } from '../wpm/wpm'

class Game extends React.Component {
    constructor(props) {
      super(props);
      let { phrase } = this.props;
      this.state = {
        phrase,
        incorrectLetters: [],
        correctLetters: [],
        userInput: "",
        inputArray: [],
        timeElapsed: 0,
        typedEntries: 0,
        wordsPerMin: 0,
        gameWon: false,
        interval: "",
      };
      this.incrementTime = this.incrementTime.bind(this);
      this.incrementEntries = this.incrementEntries.bind(this);
      this.detectKeyPresses = this.detectKeyPresses.bind(this);
    }

    checkInput() {
      if (this.state.phrase.join("") === this.state.inputArray.join("") && !this.state.gameWon) {
        this.setState({
          gameWon: true,
          wordsPerMin: Math.floor((this.props.phraseLength / 5) / (this.state.timeElapsed / 60))
        });
        clearInterval(this.state.interval);
      }
      return (e) => {
          this.setState({ inputArray: e.target.value });
      };
    }

    componentDidUpdate() {
      this.checkInput();
    }

    componentDidMount() {
      document.addEventListener("keydown", this.detectKeyPresses);
      this.setState( { interval: setInterval(this.incrementTime, 1000) });
    }

    componentWillUnmount() {
      document.removeEventListener("keydown", this.detectKeyPresses);
    }

    detectKeyPresses(e) {
      let newPhrase = this.state.phrase;
      let newIncorrectLetters = this.state.incorrectLetters;
      let newCorrectLetters = this.state.correctLetters;
      let nextLetter;
      if (e.metaKey && e.key === "v") {
        e.preventDefault();
        alert("You can't do that!");
      } else if (e.key === 'Backspace'){
        if (newIncorrectLetters.length){
          nextLetter = newIncorrectLetters.pop();
        } else {
          nextLetter = newCorrectLetters.pop();
        }
        newPhrase.unshift(nextLetter);
        this.updateArrays(newIncorrectLetters, newCorrectLetters, newPhrase);
      } else if (e.key === newPhrase[0] && newIncorrectLetters.length === 0) {
        nextLetter = newPhrase.shift();
        newCorrectLetters.push(nextLetter);
        this.updateArrays(newIncorrectLetters, newCorrectLetters, newPhrase);
      } else if (e.key !== newPhrase[0]) {
        nextLetter = newPhrase.shift();
        newIncorrectLetters.push(nextLetter);
        this.updateArrays(newIncorrectLetters, newCorrectLetters, newPhrase);
      }
      console.log(this.state.phrase)
      // console.log(this.state.incorrectLetters)
      console.log(this.state.correctLetters)
    }
    
    updateArrays(newIncorrectLetters, newCorrectLetters, newPhrase ){
      this.setState({ 
        incorrectLetters: newIncorrectLetters,
        correctLetters: newCorrectLetters,
        phrase: newPhrase,
      });
    }

    incrementEntries() {
      this.setState((oldState) => ({typedEntries: oldState.typedEntries + 1}));
    }

    incrementTime() {
      this.setState((oldState) => ({timeElapsed: oldState.timeElapsed + 1}));
    }

    update(field) {
      return (e) => {
        this.incrementEntries();
        this.setState({
          [field]: e.currentTarget.value,
          wordsPerMin: Math.floor((this.state.typedEntries / 5) / (this.state.timeElapsed / 60)),
        });
      };
    }

    render () {

        return (
          <>
            <div className="game-area-parent">
              <div className="game-area">
                <p className="answer-phrase flex">
                    <span className="green">{ this.state.correctLetters.join("") } </span>
                    <span className="red">{ this.state.incorrectLetters.join("") } </span>
                    <span className="regular" >{ this.state.phrase.join("") } </span>
                </p>
                { this.gameWon ? <p>You finished!</p> : ""}
                <form className="user-input flex" onSubmit={(e) => e.preventDefault()}>
                  <label>
                    <input 
                      type="text"
                      onChange={this.update("userInput")}
                      onPaste={ function(){return false}}
                      placeholder="Type the above text here!"
                      value={this.state.inputArray}
                      />
                  </label>
                </form>
                <p className="wpm flex">Words per minute: {this.state.wordsPerMin}</p>
                <p className="wpm flex">Time: {this.state.timeElapsed} seconds</p>
              </div>
            </div>
          </>
        )
    }
}

export default Game;