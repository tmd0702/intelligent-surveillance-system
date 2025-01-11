import * as httpRequest from '../utils/request';
import { processRefreshToken } from './AuthenticationServices';

export const getAttendances = async () => {
    try {
        const res = await httpRequest.get(`api/attendances/get`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info')).token : null
                    }`,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
        if (error.status === 401 || (error?.response?.status === 401)) {
            return await processRefreshToken(getAttendances);
        }
    }
};

export const countTodayAttendances = async () => {
    try {
        const res = await httpRequest.get(`api/attendances/today-count`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info')).token : null
                    }`,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
        if (error.status === 401 || (error?.response?.status === 401)) {
            return await processRefreshToken(() => countTodayAttendances());
             
        }
    }
};

export const getAttendanceById = async (id) => {
    try {
        const res = await httpRequest.get(`api/attendances/get/id`, {
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
            return await processRefreshToken(() => getAttendanceById(id));
        }
    }
};

export const updateAttendance = async (id, details) => {
    try {
        const res = await httpRequest.post(
            `api/attendances/update/id`,
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
            return await processRefreshToken(() => updateAttendance(id, details));
             
        }
    }
};

export const addAttendance = async (details) => {
    try {
        const res = await httpRequest.post(
            `api/attendances/create`,
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
            return await processRefreshToken(() => addAttendance(details));
             
        }
    }
};

export const deleteAttendance = async (id) => {
    try {
        const res = await httpRequest.post(
            `api/attendances/delete/id`,
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
            return await processRefreshToken(() => deleteAttendance(id));
             
        }
    }
};
