
import { RECEIVE_USER_LOGOUT, RECEIVE_USER_LOGIN, RECEIVE_CURRENT_USER } from '../../actions/session_actions';

const initialState = {
    isAuthenticated: false,
    user: {},
};

const SessionReducer = (state = initialState, action) => {
    switch(action.type) {
        case RECEIVE_CURRENT_USER:
            return {
                ...state,
                user: action.currentUser,
                isAuthenticated: true,
            }
        case RECEIVE_USER_LOGIN:
            return {
                ...state,
                isAuthenticated: true,
            }
        case RECEIVE_USER_LOGOUT:
            return {
                isAuthenticated: false,
                user: undefined
            };
        default:
            return state;
    }
}

export default SessionReducer;