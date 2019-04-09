import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { randomPhrase } from './phrases';
import { saveRace } from '../../actions/race_actions';
import { openModal } from '../../actions/modal_actions';
import SocketContext from '../../api/socket-context';
import Game from './game';

const GameWithSocket = props => (
	<SocketContext.Consumer>
		{socket => <Game {...props} socket={socket} />}
	</SocketContext.Consumer>
)

const mapStateToProps = function(state) {
		let phrase = randomPhrase();
		return ({
			user: state.session.user,
			phrase: phrase[0].split(""),
			phraseOrigin: phrase[1],
			phraseLength: phrase[0].length,
			loggedIn: state.session.isAuthenticated,
		});
};

const mapDispatchToProps = dispatch => ({
	saveRace: (race) => dispatch(saveRace(race)),
	openModal: (modal) => dispatch(openModal(modal)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GameWithSocket));