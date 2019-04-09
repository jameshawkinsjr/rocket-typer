import { RECEIVE_RECENT_RACES } from '../../actions/race_actions';
import merge from 'lodash/merge';

const RecentRaceReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState;
    switch(action.type) {
        case RECEIVE_RECENT_RACES:
            return action.recentRaces.data;
        default:
            return state;
    }
};

export default RecentRaceReducer;