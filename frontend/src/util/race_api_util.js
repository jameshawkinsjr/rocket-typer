import axios from 'axios';

export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

export const fetchRaces = (username) => {
    return axios.get(`/api/races/user/${username}`);
};
export const fetchRace = (raceId) => {
    return axios.get(`/api/races/${raceId}`);
};

export const fetchUserStats = (username) => {
    return axios.get(`/api/races/user/${username}/stats`);
};

export const fetchUserDate = (username) => {
    return axios.get(`/api/users/${username}`);
};

export const fetchLeaderboardRaces = () => {
    return axios.get(`/api/races/top10`);
};

export const fetchRecentRaces = () => {
    return axios.get(`/api/races/recent`);
};

export const saveRace = (race) => {
    return axios.post('/api/races', race);
};