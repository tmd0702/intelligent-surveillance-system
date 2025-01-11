import * as httpRequest from '../utils/request';
import { processRefreshToken } from './AuthenticationServices';

export const getDepartments = async () => {
    try {
        const res = await httpRequest.get(`api/departments/get`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info')).token : null
                    }`,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
        if (error.status === 401 || (error?.response?.status === 401)) {
            return await processRefreshToken(() => getDepartments());
             
        }
    }
};
export const countDepartments = async () => {
    try {
        const res = await httpRequest.get(`api/departments/count`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info')).token : null
                    }`,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
        if (error.status === 401 || (error?.response?.status === 401)) {
            return await processRefreshToken(() => countDepartments());
             
        }
    }
};

export const getDepartmentById = async (id) => {
    try {
        const res = await httpRequest.get(`api/departments/get/id`, {
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
            return await processRefreshToken(() => getDepartmentById(id));
            
        }
    }
};

export const updateDepartment = async (id, details) => {
    try {
        const res = await httpRequest.post(
            `api/departments/update/id`,
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
            return await processRefreshToken(() => updateDepartment(id, details));
             
        }
    }
};

export const addDepartment = async (details) => {
    try {
        const res = await httpRequest.post(
            `api/departments/create`,
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
            return await processRefreshToken(() => addDepartment(details));
        }
    }
};

export const deleteDepartment = async (id) => {
    try {
        const res = await httpRequest.post(
            `api/departments/delete/id`,
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
            return await processRefreshToken(() => deleteDepartment(id));
        }
    }
};
