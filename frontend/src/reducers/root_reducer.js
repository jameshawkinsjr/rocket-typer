import { combineReducers } from 'redux';
import session from './session/session_api_reducer';
import errors from './errors/errors_reducer';
import entities from './entities/entities_reducer';
import ui from './ui/ui_reducer';

const RootReducer = combineReducers( {
    session,
    errors,
    entities,
    ui,
});

export default RootReducer;