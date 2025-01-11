import * as httpRequest from '../utils/request';
import { processRefreshToken } from './AuthenticationServices';


export const getBalanceByUserId = async (userId) => {
    try {
        const res = await httpRequest.get(`api/wallets/get/user_id`, {
            params: {
                user_id: userId,
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
            return await processRefreshToken(() => getBalanceByUserId(userId));
             
        }
    }
};

export const deposit = async (userId, amount) => {
    try {
        const res = await httpRequest.post(
            `api/wallets/deposit`,
            {
                user_id: userId,
                amount: amount
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
            return await processRefreshToken(() => deposit(userId, amount));
             
        }
    }
};

