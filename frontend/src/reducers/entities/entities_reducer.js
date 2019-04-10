import { combineReducers } from 'redux';
import RaceReducer from './race_entities_reducer';
import LeaderboardRaceReducer from './leaderboard_race_entities_reducer';
import RecentRaceReducer from './recent_race_entities_reducer';
import UserStatsReducer from './user_stats_reducer';
import GameReducer from './game_entities_reducer';

export default combineReducers({
    races: RaceReducer,
    leaderboardRaces: LeaderboardRaceReducer,
    recentRaces: RecentRaceReducer,
    userStats: UserStatsReducer,
    game: GameReducer,
});