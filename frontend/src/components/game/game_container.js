import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { saveRace } from '../../actions/race_actions';
import { openModal } from '../../actions/modal_actions';
import SocketContext from '../../api/socket-context';
import { randomPhrase } from '../utils/phrases';
import { clearCurrentGame } from '../../actions/game_actions';
import { generateUUID } from '../utils/generateUUID';
import Game from './game';

const GameWithSocket = props => (
	<SocketContext.Consumer>
		{socket => <Game {...props} socket={socket} />}
	</SocketContext.Consumer>
)

const mapStateToProps = function(state) {
		let currentUser = state.session.user ? state.session.user.username : "Guest";
		let phrase;
		let gameId;
		let type;
		let players;
		let newPlayers = {};
		newPlayers[currentUser] = {username: currentUser, progress: 0, playerId: "practicePlayer"};
		state.entities.game.players ? players = state.entities.game.players : players = newPlayers;
		state.entities.game.phrase ? phrase = state.entities.game.phrase : phrase = randomPhrase();
		state.entities.game.gameId ? gameId = state.entities.game.gameId : gameId = generateUUID();
		state.entities.game.type ? type = state.entities.game.type : type = "practice";

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
	clearCurrentGame: () => dispatch(clearCurrentGame()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GameWithSocket));