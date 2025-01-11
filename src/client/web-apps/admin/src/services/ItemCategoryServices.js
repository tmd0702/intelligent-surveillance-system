import * as httpRequest from '../utils/request';
import { processRefreshToken } from './AuthenticationServices';

export const getItemCategories = async () => {
    try {
        const res = await httpRequest.get(`api/items/categories/get`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info')).token : null
                    }`,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
        if (error.status === 401 || (error?.response?.status === 401)) {
            return await processRefreshToken(() => getItemCategories());
        }
    }
};

export const getItemCategoryById = async (id) => {
    try {
        const res = await httpRequest.get(`api/items/categories/get/id`, {
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
            return await processRefreshToken(() => getItemCategoryById(id));
        }
    }
};

export const updateItemCategory = async (id, details) => {
    try {
        const res = await httpRequest.post(
            `api/items/categories/update/id`,
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
            return await processRefreshToken(() => updateItemCategory(id, details));
             
        }
    }
};

export const addItemCategory = async (details) => {
    try {
        const res = await httpRequest.post(
            `api/items/categories/create`,
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
            return await processRefreshToken(() => addItemCategory(details));
             
        }
    }
};

export const deleteItemCategory = async (id) => {
    try {
        const res = await httpRequest.post(
            `api/items/categories/delete/id`,
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
            return await processRefreshToken(() => deleteItemCategory(id));
             
        }
    }
};
