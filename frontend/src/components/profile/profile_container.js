import { connect } from 'react-redux';
import { clearErrors, logout } from '../../actions/session_actions';
import { fetchRaces, fetchUserStats, saveRace } from '../../actions/race_actions';
import Profile from './profile';
import { openModal } from '../../actions/modal_actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => ({
    user: state.session.user,
    loggedIn: state.session.isAuthenticated,
    races: Object.values(state.entities.races),
    userStats: Object.values(state.entities.userStats),
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    fetchRaces: (username) => dispatch(fetchRaces(username)),
    fetchUserStats: (username) => dispatch(fetchUserStats(username)),
    saveRace: () => dispatch(saveRace()),
    openModal: (modal) => dispatch(openModal(modal)),
    clearErrors: () => dispatch(clearErrors()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));