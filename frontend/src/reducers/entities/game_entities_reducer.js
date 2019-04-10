import { RECEIVE_CURRENT_GAME } from '../../actions/game_actions';

const GameReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_CURRENT_GAME:
            return action.game;
        default:
            return state;
    }
};

export default GameReducer;