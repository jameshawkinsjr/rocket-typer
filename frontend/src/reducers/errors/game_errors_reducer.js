import { RECEIVE_CURRENT_GAME } from '../../actions/game_actions';

const _nullErrors = [];

const GameErrorsReducer = (state = _nullErrors, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_CURRENT_GAME:
        case CLEAR_CURRENT_RACE:
            return _nullErrors;
        default:
            return state;
    }
};

export default GameErrorsReducer;