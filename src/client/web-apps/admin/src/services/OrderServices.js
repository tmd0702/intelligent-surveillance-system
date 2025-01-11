import * as httpRequest from '../utils/request';
import { processRefreshToken } from './AuthenticationServices';

export const getOrders = async () => {
    try {
        const res = await httpRequest.get(`api/orders/get`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info')).token : null
                    }`,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
        if (error.status === 401 || (error?.response?.status === 401)) {
            return await processRefreshToken(() => getOrders());
             
        }
    }
};
export const getOrderItemsByOrderId = async (orderId) => {
    console.log('order', orderId);
    try {
        const res = await httpRequest.get(`/api/orders/items/get/id`, {
            params: {
                order_id: orderId,
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
            return await processRefreshToken(() => getOrderItemsByOrderId(orderId));
             
        }
    }
};
export const getOrderById = async (id) => {
    try {
        const res = await httpRequest.get(`api/orders/get/id`, {
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
            return await processRefreshToken(() => getOrderById(id));
             
        }
    }
};

export const updateOrder = async (id, details) => {
    try {
        const res = await httpRequest.post(
            `api/orders/update/id`,
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
            return await processRefreshToken(() => updateOrder(id, details));
             
        }
    }
};

export const addOrder = async (details) => {
    try {
        const res = await httpRequest.post(
            `api/orders/create`,
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
            return await processRefreshToken(() => addOrder(details));
             
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
            return await processRefreshToken(() => deleteOrder(id));
             
        }
    }
};
