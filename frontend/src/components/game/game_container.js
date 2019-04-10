import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { saveRace } from '../../actions/race_actions';
import { openModal } from '../../actions/modal_actions';
import SocketContext from '../../api/socket-context';
import { randomPhrase } from '../phrases/phrases';
import Game from './game';

const GameWithSocket = props => (
	<SocketContext.Consumer>
		{socket => <Game {...props} socket={socket} />}
	</SocketContext.Consumer>
)

const mapStateToProps = function(state) {
		let currentUser = state.session.user.username;
		let phrase;
		let gameId;
		let type;
		let players = {};
		players[currentUser] = {username: currentUser, progress: 0};
		state.entities.game.players ? players = state.entities.game.players : players = players
		state.entities.game.phrase ? phrase = state.entities.game.phrase : phrase = randomPhrase()
		state.entities.game.gameId ? gameId = state.entities.game.gameId : gameId = "practice"
		state.entities.game.type ? type = state.entities.game.type : type = "practice"

		return ({
			user: state.session.user,
			loggedIn: state.session.isAuthenticated,
			phrase: phrase[0].split(""),
			phraseOrigin: phrase[1],
			phraseLength: phrase[0].length,
			gameId,
			type,
			players,
		});
};

const mapDispatchToProps = dispatch => ({
	saveRace: (race) => dispatch(saveRace(race)),
	openModal: (modal) => dispatch(openModal(modal)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GameWithSocket));