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
      }
      // Words per minute formula
      // WPM = (All typed Entries/5)/(time(min))

      this.incrementTime = this.incrementTime.bind(this);
    }

    checkInput() {
      if (this.state.phrase === this.state.userInput) {
      alert("You win!");
      }
    }

    componentDidUpdate() {
      this.checkInput();
    }

    componentDidMount() {
      setInterval(this.incrementTime, 1000)
    }

    incrementTime() {
      this.setState((oldState) => ({timeElapsed: oldState.timeElapsed + 1}))
    }

    update(field) {
      return (e) => {
        this.setState({
          [field]: e.currentTarget.value,
          wordsPerMin: ((this.state.typedEntries / 5) / (this.state.timeElapsed / 60))
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