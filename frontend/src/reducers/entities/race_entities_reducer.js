import { RECEIVE_CURRENT_RACE } from '../../actions/race_actions';

const RaceReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_CURRENT_RACE:
            return action.currentRace;
        default:
            return state;
    }
};

export default RaceReducer;