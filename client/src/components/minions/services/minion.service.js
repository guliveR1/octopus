import axios from 'axios';
import config from '../../../config';

export const getMinions = () => {
    return axios.get(`${config.apiUrl}/minions`);
};

export const addMinion = (hostname, username, password) => {
    return axios.post(`${config.apiUrl}/minions`, {
        minionHost: hostname,
        minionUsername: username,
        minionPassword: password
    });
};

export const restartMinion = (hostname, username, password) => {
    return axios.post(`${config.apiUrl}/minions/restart`, {
        minionHost: hostname,
        minionUsername: username,
        minionPassword: password
    });
};