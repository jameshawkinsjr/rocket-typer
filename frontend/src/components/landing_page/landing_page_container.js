import { connect } from 'react-redux';
import { clearErrors } from '../../actions/session_actions';
import { fetchLeaderboardRaces, fetchRecentRaces } from '../../actions/race_actions';
import LandingPage from './landing_page';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => ({
    user: state.session.user,
    loggedIn: state.session.isAuthenticated,
    leaderboardRaces: Object.values(state.entities.leaderboardRaces),
    recentRaces: Object.values(state.entities.recentRaces),
});

const mapDispatchToProps = dispatch => ({
    fetchLeaderboardRaces: () => dispatch(fetchLeaderboardRaces()),
    fetchRecentRaces: () => dispatch(fetchRecentRaces()),
    clearErrors: () => dispatch(clearErrors()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LandingPage));