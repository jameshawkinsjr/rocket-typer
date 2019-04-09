import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { openModal } from '../../actions/modal_actions';

function GameStats({ time, wordsPerMin, accuracy, loggedIn, openModal, phraseOrigin }) {
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
        <div className="skills-container-row phrase-origin flex"><p> This quote was from:</p> <p className="origin">{ phraseOrigin }</p> </div>
        <div className="skills-container-row flex"><p> Words per minute:</p> <p className="origin">{ Math.floor(wordsPerMin) }</p> </div>
        <div className="skills-container-row flex"><p> Time:</p> <p className="origin">{ time.toFixed(1)} seconds</p> </div>
        <div className="skills-container-row skills-bottom flex"><p> Accuracy:</p> <p className="origin">{accuracy}% </p></div>
        {loginBtn}
    </div>
  )

}

const mapStateToProps = (state, ownProps) => ({
  time: ownProps.time,
  wordsPerMin: ownProps.wordsPerMin,
  accuracy: ownProps.accuracy,
  loggedIn: state.session.isAuthenticated,
  phraseOrigin: ownProps.phraseOrigin,
})

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal()),
  openModal: (modal) => dispatch(openModal(modal))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GameStats));