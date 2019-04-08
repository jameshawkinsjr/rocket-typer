import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchRace } from '../../actions/race_actions';

import Race from './race';

const mapStateToProps = (state, ownProps) => ({
	raceId: ownProps.match.params.raceId,
	users: Object.values(state.entities.races),
});

const mapDispatchToProps = dispatch => ({
	fetchRace: (raceId) => dispatch(fetchRace(raceId)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Race));