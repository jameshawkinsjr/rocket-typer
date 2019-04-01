import { RECEIVE_CURRENT_RACE, RECEIVE_ALL_RACES, RECEIVE_RACE_ERRORS } from '../../actions/race_actions';

const _nullErrors = [];

const RaceErrorsReducer = (state = _nullErrors, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_RACE_ERRORS:
            return action.errors;
        case RECEIVE_ALL_RACES:
        case RECEIVE_CURRENT_RACE:
            return _nullErrors;
        default:
            return state;
    }
};

export default RaceErrorsReducer;