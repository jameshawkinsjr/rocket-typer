import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchRace } from '../../actions/race_actions';
import { openModal } from '../../actions/modal_actions';

import Race from './race';

const mapStateToProps = function(state, ownProps){
	let users = Object.values(state.entities.races);
	return ({
		raceId: ownProps.match.params.raceId,
		users,
		winner: ( users[0] ? users[0].username : "Loading"),
	});
};

const mapDispatchToProps = dispatch => ({
	fetchRace: (raceId) => dispatch(fetchRace(raceId)),
	openModal: (modal) => dispatch(openModal(modal)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Race));