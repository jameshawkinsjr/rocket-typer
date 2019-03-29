import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { withRouter } from 'react-router-dom';
import { openModal } from '../../actions/modal_actions';
import NavBar from './navbar';

const mapStateToProps = (state, ownProps) => ({
    user: state.session.user,
    loggedIn: state.session.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    openModal: (modal) => dispatch(openModal(modal))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));