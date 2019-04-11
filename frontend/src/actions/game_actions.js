export const RECEIVE_CURRENT_GAME = "RECEIVE_CURRENT_GAME";
export const CLEAR_CURRENT_RACE = "CLEAR_CURRENT_RACE";

export const receiveCurrentGame = game => ({
    type: RECEIVE_CURRENT_GAME,
    game
});

export const clearCurrentGame = () => ({
    type: CLEAR_CURRENT_RACE
});
