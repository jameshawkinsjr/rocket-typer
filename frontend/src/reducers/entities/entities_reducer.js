import { combineReducers } from 'redux';
import RaceReducer from './race_entities_reducer';
import LeaderboardRaceReducer from './leaderboard_race_entities_reducer';
import UserStatsReducer from './user_stats_reducer';

export default combineReducers({
    races: RaceReducer,
    leaderboardRaces: LeaderboardRaceReducer,
    userStats: UserStatsReducer,
});