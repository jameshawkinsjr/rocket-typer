import { RECEIVE_RECENT_RACES } from '../../actions/race_actions';

const RecentRaceReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_RECENT_RACES:
            return action.recentRaces.data;
        default:
            return state;
    }
};

export default RecentRaceReducer;