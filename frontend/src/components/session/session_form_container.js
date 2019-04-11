import { connect } from 'react-redux';
import { login, signup, clearErrors } from '../../actions/session_actions';
import SessionForm from './session_form';
import { openModal, closeModal } from '../../actions/modal_actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, { formType }) => ({
    loggedIn: state.session.isAuthenticated,
    errors: state.errors.session,
    formType,
});

const mapDispatchToProps = dispatch => ({
    signup: user => dispatch(signup(user)),
    login: user => dispatch(login(user)),
    closeModal: () => dispatch(closeModal()),
    openLoginModal: () => dispatch(openModal({type: 'login'})),
    openSignupModal: () => dispatch(openModal({type: "signup"})),
    clearErrors: () => dispatch(clearErrors()),
    loadingModal: () => dispatch(openModal({ type: 'loadingScreen'})),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SessionForm));