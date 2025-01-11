import * as httpRequest from '../utils/request';
import { processRefreshToken } from './AuthenticationServices';

export const getPayments = async () => {
    try {
        const res = await httpRequest.get(`api/payments/get`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info')).token : null}`,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
        if (error.status === 401 || (error?.response?.status === 401)) {
            return await processRefreshToken(() => getPayments());
            
        }
    }
};
export const countSales = async () => {
    try {
        const res = await httpRequest.get(`api/payments/sales/count`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info')).token : null}`,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
        if (error.status === 401 || (error?.response?.status === 401)) {
            return await processRefreshToken(() => countSales());
            
        }
    }
};
export const monthlyRevenue = async () => {
    try {
        const res = await httpRequest.get(`api/payments/sales/revenue`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info')).token : null}`,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
        if (error.status === 401 || (error?.response?.status === 401)) {
            return await processRefreshToken(() => monthlyRevenue());
        }
    }
};
export const todayRevenue = async () => {
    try {
        const res = await httpRequest.get(`api/payments/today-revenue`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info')).token : null}`,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
        if (error.status === 401 || (error?.response?.status === 401)) {
            return await processRefreshToken(() => todayRevenue());
            
        }
    }
};
export const storeAnalytics = async () => {
    try {
        const res = await httpRequest.get(`api/payments/store-analytics`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info')).token : null}`,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
        if (error.status === 401 || (error?.response?.status === 401)) {
            return await processRefreshToken(() =>  todayRevenue());
            
        }
    }
};
export const getPaymentById = async (id) => {
    try {
        const res = await httpRequest.get(`api/payments/get/id`, {
            params: {
                id: id,
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info')).token : null}`,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
        if (error.status === 401 || (error?.response?.status === 401)) {
            return await processRefreshToken(() =>  getPaymentById(id));
            
        }
    }
};
export const getPaymentByUserId = async (userId) => {
    try {
        const res = await httpRequest.get(`api/payments/get/user_id`, {
            params: {
                user_id: userId,
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info')).token : null}`,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
        if (error.status === 401 || (error?.response?.status === 401)) {
            return await processRefreshToken(() =>  getPaymentByUserId(userId));
            
        }
    }
};

export const addPayment = async (details) => {
    try {
        const res = await httpRequest.post(
            `api/payments/create`,
            {
                details: details
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info')).token : null}`,
                },
            },
        );

        return res;
    } catch (error) {
        console.log(error);
        if (error.status === 401 || (error?.response?.status === 401)) {
            return await processRefreshToken(() =>  addPayment(details));
            
        }
    }
};


export const deleteOrder = async (id) => {
    try {
        const res = await httpRequest.post(
            `api/orders/delete/id`,
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
            return await processRefreshToken(() =>  deleteOrder(id));
            
        }
    }
};
