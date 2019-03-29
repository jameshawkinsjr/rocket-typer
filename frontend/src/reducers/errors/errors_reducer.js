import { combineReducers } from 'redux';
import SessionErrorsReducer from './session_errors_reducer';
import RaceErrorsReducer from './race_errors_reducer';

export default combineReducers({
    session: SessionErrorsReducer,
    races: RaceErrorsReducer,
});