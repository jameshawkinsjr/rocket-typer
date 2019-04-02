import { RECEIVE_USER_STATS } from '../../actions/race_actions';
import merge from 'lodash/merge';

const UserStatsReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState;
    switch(action.type) {
        case RECEIVE_USER_STATS:
            newState = merge({}, state, action.userStats.data);
            return newState;
        default:
            return state;
    }
};

export default UserStatsReducer;