import axios from 'axios';
import config from '../../../config';

export const getGeneralStatus = () => {
    return axios.get(`${config.apiUrl}/general-status`);
};

