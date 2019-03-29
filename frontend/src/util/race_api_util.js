import axios from 'axios';

export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

export const fetchRaces = (userId) => {
    return axios.get(`/api/users/${userId}`);
};

export const saveRace = (race) => {
    return axios.post('/api/races', race);
};