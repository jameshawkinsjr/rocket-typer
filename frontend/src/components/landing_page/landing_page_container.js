import { connect } from 'react-redux';
import { clearErrors } from '../../actions/session_actions';
import { fetchTopRaces } from '../../actions/race_actions';
import LandingPage from './landing_page';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => ({
    user: state.session.user,
    loggedIn: state.session.isAuthenticated,
    races: state.entities.leaderboard,
});

const mapDispatchToProps = dispatch => ({
    fetchTopRaces: () => dispatch(fetchTopRaces()),
    clearErrors: () => dispatch(clearErrors()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LandingPage));