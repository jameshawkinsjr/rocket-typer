import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NavBar from './navbar';
import { logout } from '../../actions/session_actions';
import { openModal } from '../../actions/modal_actions';
import { fetchUserStats } from '../../actions/race_actions';

const mapStateToProps = (state, ownProps) => ({
    user: state.session.user,
    loggedIn: state.session.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    openModal: (modal) => dispatch(openModal(modal)),
    fetchUserStats: (username) => dispatch(fetchUserStats(username)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));