import { connect } from 'react-redux';
import { clearErrors, logout } from '../../actions/session_actions';
import Profile from './profile';
import { openModal } from '../../actions/modal_actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, { formType }) => ({
    user: state.session.user,
    loggedIn: state.session.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    openModal: (modal) => dispatch(openModal(modal)),
    clearErrors: () => dispatch(clearErrors()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));