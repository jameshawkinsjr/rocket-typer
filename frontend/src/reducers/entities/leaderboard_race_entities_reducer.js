import { RECEIVE_LEADERBOARD_RACES } from '../../actions/race_actions';
import merge from 'lodash/merge';

const LeaderboardRaceReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState;
    switch(action.type) {
        case RECEIVE_LEADERBOARD_RACES:
            newState = merge({}, state, action.leaderboardRaces.data);
            return newState;
        default:
            return state;
    }
};

export default LeaderboardRaceReducer;