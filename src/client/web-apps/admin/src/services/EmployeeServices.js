import * as httpRequest from '../utils/request';
import { processRefreshToken } from './AuthenticationServices';

export const getEmployees = async () => {
    try {
        const res = await httpRequest.get(`api/employees/get`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info')).token : null
                    }`,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
        if (error.status === 401 || (error?.response?.status === 401)) {
            return await processRefreshToken(() => getEmployees());
             
        }
    }
};
export const countEmployees = async () => {
    try {
        const res = await httpRequest.get(`api/employees/count`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info')).token : null
                    }`,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
        if (error.status === 401 || (error?.response?.status === 401)) {
            return await processRefreshToken(() => countEmployees());
             
        }
    }
};
export const countEmployeesByDepartment = async () => {
    try {
        const res = await httpRequest.get(`api/employees/count-by-department`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info')).token : null
                    }`,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
        if (error.status === 401 || (error?.response?.status === 401)) {
            return await processRefreshToken(() => countEmployeesByDepartment());
             
        }
    }
};

export const getEmployeeById = async (id) => {
    try {
        const res = await httpRequest.get(`api/employees/get/id`, {
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
            return await processRefreshToken(() => getEmployeeById(id));
             
        }
    }
};
export const regisFace = async (id, b64Data) => {
    try {
        const res = await httpRequest.post(`api/employees/face-regis`, {
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
            return await processRefreshToken(() => regisFace(id, b64Data));
        }
    }
};
export const updateEmployee = async (id, details) => {
    try {
        const res = await httpRequest.post(
            `api/employees/update/id`,
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
            return await processRefreshToken(() => updateEmployee(id, details));
             
        }
    }
};

export const addEmployee = async (details) => {
    try {
        const res = await httpRequest.post(
            `api/employees/create`,
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
            return await processRefreshToken(() => addEmployee(details));
             
        }
    }
};

export const deleteEmployee = async (id) => {
    try {
        const res = await httpRequest.post(
            `api/employees/delete/id`,
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
            return await processRefreshToken(() => deleteEmployee(id));
             
        }
    }
};
