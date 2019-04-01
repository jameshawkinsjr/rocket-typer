import React from 'react';

class Game extends React.Component {
    constructor(props) {
      super(props);

      let { phrase } = this.props;
      this.state = {
        phrase,
        userInput: ""
      }
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
        return (
          <>
            <p className="answer-phrase">{this.props.phrase}</p>
            <form onSubmit={this.handleSubmit}>
              <label>
                <input 
                  type="text"
                  onChange={this.update("userInput")}
                  placeholder="Type the above text here!"
                  />
              </label>
            </form>
          </>
        )
    }
}

export default Game;