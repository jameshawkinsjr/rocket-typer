import { connect } from 'react-redux';
import { clearErrors, logout } from '../../actions/session_actions';
import { fetchRaces, saveRace } from '../../actions/race_actions';
import Profile from './profile';
import { openModal } from '../../actions/modal_actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => ({
    user: state.session.user,
    loggedIn: state.session.isAuthenticated,
    races: state.entities.races,
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    fetchRaces: (userId) => dispatch(fetchRaces(userId)),
    saveRace: () => dispatch(saveRace()),
    openModal: (modal) => dispatch(openModal(modal)),
    clearErrors: () => dispatch(clearErrors()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));