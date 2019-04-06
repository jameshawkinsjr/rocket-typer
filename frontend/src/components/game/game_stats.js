import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { openModal } from '../../actions/modal_actions';

function GameStats({ time, wordsPerMin, accuracy, loggedIn, openModal }) {
  let loginBtn;
  if (!loggedIn) {
    loginBtn = (
      <>
        <span>Sign up or login to start saving your stats!</span>
        <div className="game-stats-login flex">
          <button className="button" onClick={() => openModal({ type: 'login'})}>Login</button>
          <button className="button" onClick={() => openModal({ type: 'signup'})}>Signup</button>
        </div>
      </>
    )
  }
  return (
    <div className="skills-container flex-column">
        <div className="flex"><div><h1>Mission Accomplished!</h1></div></div>
        <div className="skills-container-row flex"><p> Words per minute:</p> <p>{ Math.floor(wordsPerMin) }</p> </div>
        <div className="skills-container-row flex"><p> Time:</p> <p>{ Math.floor(time)} seconds</p> </div>
        <div className="skills-container-row flex"><p> Accuracy:</p> <p>{accuracy}% </p></div>
        {loginBtn}
    </div>
  )

}

const mapStateToProps = (state, ownProps) => ({
  time: ownProps.time,
  wordsPerMin: ownProps.wordsPerMin,
  accuracy: ownProps.accuracy,
  loggedIn: state.session.isAuthenticated
})

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal()),
  openModal: (modal) => dispatch(openModal(modal))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GameStats));