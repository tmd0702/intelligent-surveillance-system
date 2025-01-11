import * as httpRequest from '../utils/request';
import { processRefreshToken } from './AuthenticationServices';

export const getLocations = async () => {
    try {
        const res = await httpRequest.get(`api/cameras/locations/get`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info')).token : null
                    }`,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
        if (error.status === 401 || (error?.response?.status === 401)) {
            return await processRefreshToken(() => getLocations());
             
        }
    }
};

export const getLocationById = async (id) => {
    try {
        const res = await httpRequest.get(`api/cameras/locations/get/id`, {
            params: {
                id: id,
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info')).token : null
                    }`,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
        if (error.status === 401 || (error?.response?.status === 401)) {
            return await processRefreshToken(() => getLocationById(id));
             
        }
    }
};

export const updateLocation = async (id, details) => {
    try {
        const res = await httpRequest.post(
            `api/cameras/locations/update/id`,
            {
                id: id,
                details: details
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info')).token : null
                        }`,
                },
            },
        );

        return res;
    } catch (error) {
        console.log(error);
        if (error.status === 401 || (error?.response?.status === 401)) {
            return await processRefreshToken(() => updateLocation(id, details));
             
        }
    }
};

export const addLocation = async (details) => {
    try {
        const res = await httpRequest.post(
            `api/cameras/locations/create`,
            {
                details: details
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info')).token : null
                        }`,
                },
            },
        );

        return res;
    } catch (error) {
        console.log(error);
        if (error.status === 401 || (error?.response?.status === 401)) {
            return await processRefreshToken(() => addLocation(details));
             
        }
    }
};

export const deleteLocation = async (id) => {
    try {
        const res = await httpRequest.post(
            `api/cameras/locations/delete/id`,
            {
                id: id,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info')).token : null
                        }`,
                },
            },
        );

        return res;
    } catch (error) {
        console.log(error);
        if (error.status === 401 || (error?.response?.status === 401)) {
            return await processRefreshToken(() =>  deleteLocation(id));
            
        }
    }
};
