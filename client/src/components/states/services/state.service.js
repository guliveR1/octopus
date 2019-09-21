import axios from 'axios';
import config from '../../../config';

export const getStates = () => {
    return axios.get(`${config.apiUrl}/states`);
};

export const addState = (name, initFile) => {
    return axios.post(`${config.apiUrl}/states`, {name, initFile});
};

export const applyState = (name, minions) => {
    return axios.post(`${config.apiUrl}/states/${name}`, {minions});
};