import * as httpRequest from '../utils/request';
import { processRefreshToken } from './AuthenticationServices';

export const getUsers = async () => {
    try {
        const res = await httpRequest.get(`api/users/get`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info')).token : null
                    }`,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
        if (error.status === 401 || (error?.response?.status === 401)) {
            return await processRefreshToken(() => getUsers());
            
        }
    }
};
export const count = async () => {
    try {
        const res = await httpRequest.get(`api/users/count`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info')).token : null
                    }`,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
        if (error.status === 401 || (error?.response?.status === 401)) {
            return await processRefreshToken(() => count());
            
        }
    }
};

export const getUserById = async (id) => {
    try {
        const res = await httpRequest.get(`api/users/get/id`, {
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
            return await processRefreshToken(() => getUserById(id));
            
        }
    }
};

export const updateUser = async (id, details) => {
    try {
        const res = await httpRequest.post(
            `api/users/update/id`,
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
            return await processRefreshToken(() => updateUser(id, details));
             
        }
    }
};
export const regisFace = async (id, b64Data) => {
    try {
        const res = await httpRequest.post(`api/users/face-regis`, {
            b64_data: b64Data,
            id: id
        },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info')).token : null
                    }`,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
        if (error.status === 401 || (error?.response?.status === 401)) {
            return await processRefreshToken(() =>  regisFace(id, b64Data));
            
        }
    }
};
export const addUser = async (details) => {
    try {
        const res = await httpRequest.post(
            `api/users/create`,
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
            return await processRefreshToken(() =>  addUser(details));
            
        }
    }
};

export const deleteUser = async (id) => {
    try {
        const res = await httpRequest.post(
            `api/users/delete/id`,
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
            return await processRefreshToken(() =>  deleteUser(id));
            
        }
    }
};
