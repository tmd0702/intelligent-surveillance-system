import * as httpRequest from '../utils/request';
import { processRefreshToken } from './AuthenticationServices';

export const getStoreCategories = async () => {
    try {
        const res = await httpRequest.get(`api/stores/categories/get`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info')).token : null
                    }`,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
        if (error.status === 401 || (error?.response?.status === 401)) {
            return await processRefreshToken(() => getStoreCategories());
             
        }
    }
};

export const getStoreCategoryById = async (id) => {
    try {
        const res = await httpRequest.get(`api/stores/categories/get/id`, {
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
            return await processRefreshToken(() => getStoreCategoryById(id));
             
        }
    }
};

export const updateStoreCategory = async (id, details) => {
    try {
        const res = await httpRequest.post(
            `api/stores/categories/update/id`,
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
            return await processRefreshToken(() => updateStoreCategory(id, details));
             
        }
    }
};

export const addStoreCategory = async (details) => {
    try {
        const res = await httpRequest.post(
            `api/stores/categories/create`,
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
            return await processRefreshToken(() => addStoreCategory(details));
             
        }
    }
};

export const deleteStoreCategory = async (id) => {
    try {
        const res = await httpRequest.post(
            `api/stores/categories/delete/id`,
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
            return await processRefreshToken(() => deleteStoreCategory(id));
             
        }
    }
};
