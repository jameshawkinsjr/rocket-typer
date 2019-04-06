import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

function GameStats({ time, wordsPerMin, accuracy}) {
  return (
    <div className="skills-container flex-column">
        <div className="flex"><div><h1>Mission Accomplished!</h1></div></div>
        <div className="skills-container-row flex"><p> Words per minute:</p> <p>{ Math.floor(wordsPerMin) }</p> </div>
        <div className="skills-container-row flex"><p> Time:</p> <p>{ Math.floor(time)} seconds</p> </div>
        <div className="skills-container-row flex"><p> Accuracy:</p> <p>{accuracy}% </p></div>
    </div>
  )

}

const mapStateToProps = (state, ownProps) => ({
  time: ownProps.time,
  wordsPerMin: ownProps.wordsPerMin,
  accuracy: ownProps.accuracy
})

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GameStats));