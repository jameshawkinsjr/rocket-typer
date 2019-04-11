import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SessionFormContainer from '../session/session_form_container';
import Ranks from '../ranks/ranks';
import GameStats from '../game/game_stats';
import LoadingScreen from '../utils/loading_screen';

function Modal({modal, closeModal}) {
  if (!modal) {
    return null;
  }
  let component;
  switch (modal.type) {
    case 'login':
      component = <SessionFormContainer closeModal={closeModal} formType="login"/> ;
      break;
    case 'signup':
      component = <SessionFormContainer closeModal={closeModal} formType="signup"/> ;
      break;
    case 'ranks':
      component = <Ranks closeModal={closeModal}/> ;
      break;
    case 'gameStats':
      component = <GameStats closeModal={closeModal} wordsPerMin={modal.wordsPerMin} time={modal.time} accuracy={modal.accuracy} phraseOrigin={modal.phraseOrigin} />;
      break;
    case 'loadingScreen':
      component = <LoadingScreen />;
      break;
    default:
      return null;
  }
  return (
    <div className="modal-background" onClick={closeModal}>
      <div className="modal-child flex-column" onClick={e => e.stopPropagation()}>
      { component }
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    modal: state.ui.modal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Modal));