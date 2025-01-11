import * as httpRequest from '../utils/request';
import { processRefreshToken } from './AuthenticationServices';


export const getByFaceImage = async (b64Data) => {
    try {
        const res = await httpRequest.post(`api/tracking/get/face_image`, {
            b64_data: b64Data,
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info')).token : null
                    }`,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
        if (error.status === 401 || (error?.response?.status === 401)) {
            return await processRefreshToken(() => getByFaceImage(b64Data));
             
        }
    }
};
export const getByPhoneNumber = async (phoneNumber) => {
    try {
        const res = await httpRequest.get(`api/tracking/get/phone_number`, {
            params: {
                phone_number: phoneNumber,
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
            return await processRefreshToken(() => getByPhoneNumber(phoneNumber));
             
        }
    }
};
export const todayVisitors = async () => {
    try {
        const res = await httpRequest.get(`api/tracking/get/today-visitors`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info')).token : null
                    }`,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
        if (error.status === 401 || (error?.response?.status === 401)) {
            return await processRefreshToken(() => todayVisitors());
             
        }
    }
};
export const monthlyVisitors = async () => {
    try {
        const res = await httpRequest.get(`api/tracking/get/monthly-visitors`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info')).token : null
                    }`,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
        if (error.status === 401 || (error?.response?.status === 401)) {
            return await processRefreshToken(() => monthlyVisitors());
        }
    }
};
export const getByEmail = async (email) => {
    try {
        const res = await httpRequest.get(`api/tracking/get/email`, {
            params: {
                email: email,
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
            return await processRefreshToken(() => getByEmail(email));
             
        }
    }
};
export const getUserByFaceId = async (b64Data) => {
    try {
        const res = await httpRequest.post(`api/tracking/user/get/face_id`, {
            b64_data: b64Data
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
            return await processRefreshToken(() => getUserByFaceId(b64Data));
             
        }
    }
};
export const addFace = async (b64Data) => {
    try {
        const res = await httpRequest.post(`api/tracking/face/create`, {
            b64_data: b64Data
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
            return await processRefreshToken(() => getUserByFaceId(b64Data));
             
        }
    }
};

