import { RECEIVE_SESSION_ERRORS, 
         RECEIVE_CURRENT_USER,
         CLEAR_SESSION_ERRORS,
         RECEIVE_USER_LOGIN } from '../../actions/session_actions';

const _nullErrors = [];

const SessionErrorsReducer = (state = _nullErrors, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_SESSION_ERRORS:
            return action.errors;
        case RECEIVE_CURRENT_USER:
        case RECEIVE_USER_LOGIN:
            return _nullErrors;
        case CLEAR_SESSION_ERRORS:
            return [];
        default:
            return state;
    }
};

export default SessionErrorsReducer;