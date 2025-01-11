import axios from 'axios';
import {processRefreshToken} from '../services/AuthenticationServices';

// axios.defaults.withCredentials = true
const httpRequest = axios.create({
    baseURL: 'https://dev.softzoneglobal.com/',
    headers: {
        'Content-Type': 'application/json',
  },
});

// httpRequest.interceptors.response.use(
//     async response => {
//         if (response.data.result && response.data.result?.success === false && response.data.result.message === 'Session expired') {
//             await processRefreshToken();
//             const config = response.config;
//             return httpRequest(config);
//         }
//         return response;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// );

export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response.data;
};

export const post = async (path, data, options = {}) => {

    const response = await httpRequest.post(path, data, options);
    return response.data;
};

export const del = async (path, options = {}) => {
    const response = await httpRequest.delete(path, options);
    return response.data;
};

export default httpRequest;
