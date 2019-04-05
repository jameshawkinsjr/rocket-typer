import React from 'react';

export class Wpm extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        wordsPerMin: (this.props.typedEntries/5)/(this.props.timeElapsed/60) || 0
      }
    }

    render () {
      return (
        <h1>{this.state.wordsPerMin}</h1>
      )
    }
}