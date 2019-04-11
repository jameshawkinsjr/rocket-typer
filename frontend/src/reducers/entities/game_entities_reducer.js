import { RECEIVE_CURRENT_GAME, CLEAR_CURRENT_RACE } from '../../actions/game_actions';

const _nullGame = {};

const GameReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_CURRENT_GAME:
            return action.game;
        case CLEAR_CURRENT_RACE:
            return _nullGame;
        default:
            return state;
    }
};

export default GameReducer;