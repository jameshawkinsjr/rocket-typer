import * as APIUtil from '../util/races_api_util';

export const RECEIVE_CURRENT_RACE = "RECEIVE_CURRENT_RACE";
export const RECEIVE_RACE_ERRORS = "RECEIVE_RACE_ERRORS";

export const receiveCurrentRace = currentRace => ({
    type: RECEIVE_CURRENT_RACE,
    currentRace
});

export const receiveRaceErrors = errors => ({
    type: RECEIVE_RACE_ERRORS,
    errors
});

// THUNK ACTIONS
export const fetchRace = userId => dispatch => (
    APIUtil.fetchRace(userId)
        .then(
            currentRace => dispatch(receiveCurrentRace(currentRace)),
            err => dispatch(receiveRaceErrors(err.response.data))
        )
);

export const saveRace = races => dispatch => (
    APIUtil.saveRace(races)
        .then(
            currentRace => dispatch(receiveCurrentRace(currentRace)),
            err => dispatch(receiveRaceErrors(err.response.data))
        )
);
