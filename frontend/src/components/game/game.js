import React from 'react';
import { Wpm } from '../wpm/wpm'

class Game extends React.Component {
    constructor(props) {
      super(props);

      let { phrase } = this.props;
      this.state = {
        phrase,
        userInput: "",
        timeElapsed: 2,
        typedEntries: 28,
        
      }
      // Words per minute formula
      // WPM = (All typed Entries/5)/(time(min))
    }

    checkInput() {
      if (this.state.phrase === this.state.userInput) {
      alert("You win!");
      }
    }

    componentDidUpdate() {
      this.checkInput();
    }

    update(field) {
      return (e) => {
        this.setState({
          [field]: e.currentTarget.value
        })
      }
    }

    render () {
      console.log(this.state.userLength)
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
            <Wpm 
              state={this.state}/>
          </>
        )
    }
}

export default Game;