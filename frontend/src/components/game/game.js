import React from 'react';
// import { Wpm } from '../wpm/wpm'

class Game extends React.Component {
    constructor(props) {
      super(props);

      let { phrase } = this.props;
      this.state = {
        phrase,
        userInput: "",
        inputArray: [],
        timeElapsed: 0,
        typedEntries: 0,
        wordsPerMin: 0,
        gameWon: false,
        interval: "",
      };
      // Words per minute formula
      // WPM = (All typed Entries/5)/(time(min))
      this.incrementTime = this.incrementTime.bind(this);
      this.incrementEntries = this.incrementEntries.bind(this);
      this.detectKeyPresses = this.detectKeyPresses.bind(this);
    }

    checkInput() {
      if (this.state.phrase === this.state.inputArray.join("") && !this.state.gameWon) {
        this.setState({
          gameWon: true,
          wordsPerMin: Math.floor((this.props.phraseLength / 5) / (this.state.timeElapsed / 60))
        });
      clearInterval(this.state.interval);
      }
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
      if (e.metaKey && e.key === "v") {
        e.preventDefault();
        alert("You can't do that!");
      } else if (e.key === 'Backspace'){
        let array = this.state.inputArray;
        array.pop();
        this.setState({ inputArray: array });
      } else if (e.key !== "Shift" && e.key !== "Alt" && !e.metaKey) {
        let array = this.state.inputArray;
        array.push(e.key);
        this.setState({ inputArray: array });
      }
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
          wordsPerMin: Math.floor((this.state.typedEntries / 5) / (this.state.timeElapsed / 60))
        })
      }
    }

    render () {
        return (
          <>
            <div className="game-area-parent">
              <div className="game-area">
                <p className="answer-phrase flex">{this.props.phrase}</p>
                <p className="answer-phrase flex">{this.state.inputArray}</p>
                { this.gameWon ? <p>You finished!</p> : ""}
                <form className="user-input flex" onSubmit={(e) => e.preventDefault()}>
                  <label>
                    <input 
                      type="text"
                      onChange={this.update("userInput")}
                      onPaste={ function(){return false}}
                      placeholder="Type the above text here!"
                      value={this.state.inputArray.join("")}
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