import React from 'react';
// import { Wpm } from '../wpm/wpm'

class Game extends React.Component {
    constructor(props) {
      super(props);

      let { phrase } = this.props;
      this.state = {
        phrase,
        userInput: "",
        timeElapsed: 0,
        typedEntries: 0,
        wordsPerMin: 0,
        gameWon: false
      }
      // Words per minute formula
      // WPM = (All typed Entries/5)/(time(min))

      this.incrementTime = this.incrementTime.bind(this);
      this.incrementEntries = this.incrementEntries.bind(this);
    }

    checkInput() {
      if (this.state.phrase === this.state.userInput && !this.state.gameWon) {
        this.setState({
          gameWon: true
        })
      alert("You win!");
      }
    }

    componentDidUpdate() {
      this.checkInput();
    }

    componentDidMount() {
      setInterval(this.incrementTime, 1000)
    }

    incrementEntries() {
      this.setState((oldState) => ({typedEntries: oldState.typedEntries + 1}))
    }

    incrementTime() {
      this.setState((oldState) => ({timeElapsed: oldState.timeElapsed + 1}))
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
            <h1 className="answer-phrase">{this.props.phrase}</h1>
            <form onSubmit={this.handleSubmit}>
              <label>
                <input 
                  type="text"
                  onChange={this.update("userInput")}
                  placeholder="Type the above text here!"
                  />
              </label>
            </form>
            <h1>{this.state.wordsPerMin}</h1>
          </>
        )
    }
}

export default Game;