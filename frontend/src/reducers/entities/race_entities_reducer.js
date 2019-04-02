import { RECEIVE_CURRENT_RACE, RECEIVE_ALL_RACES } from '../../actions/race_actions';
import merge from 'lodash/merge';

const RaceReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState;
    switch(action.type) {
        case RECEIVE_CURRENT_RACE:
            newState = merge({}, state, action.currentRace.data);
            return newState;
        case RECEIVE_ALL_RACES:
            newState = merge({}, state, action.races.data);
            return newState;
        default:
            return state;
    }
};

export default RaceReducer;