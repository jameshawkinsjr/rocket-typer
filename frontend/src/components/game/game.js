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

    update(field) {
      return (e) => {
        this.setState({
          [field]: e.currentTarget.value
        })
      }
    }

    render () {
        console.log(this.props)
        return (
          <>
            <h1>{this.props.phrase}</h1>
            
          </>
        )
    }
}

export default Game;