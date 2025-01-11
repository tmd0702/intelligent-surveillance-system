import * as httpRequest from '../utils/request';
import { processRefreshToken } from './AuthenticationServices';

export const getParkingTickets = async () => {
    try {
        const res = await httpRequest.get(`api/vehicle_parking/tickets/get`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info')).token : null
                    }`,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
        if (error.status === 401 || (error?.response?.status === 401)) {
            return await processRefreshToken(() => getParkingTickets());
             
        }
    }
};

export const getParkingTicketById = async (id) => {
    try {
        const res = await httpRequest.get(`api/vehicle_parking/tickets/get/id`, {
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
            return await processRefreshToken(() => getParkingTicketById(id));
             
        }
    }
};
export const checkOut = async (details) => {
    try {
        const res = await httpRequest.post(
            `api/vehicle_parking/checkout`,
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
            return await processRefreshToken(() => checkOut(details));
            
        }
    }
};
export const checkIn = async (details) => {
    try {
        const res = await httpRequest.post(
            `api/vehicle_parking/checkin`,
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
            return await processRefreshToken(() => checkIn(details));
             
        }
    }
};
export const updateParkingTicket = async (id, details) => {
    try {
        const res = await httpRequest.post(
            `api/vehicle_parking/tickets/update/id`,
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
            return await processRefreshToken(() => updateParkingTicket(id, details));
             
        }
    }
};

export const addParkingTicket = async (details) => {
    try {
        const res = await httpRequest.post(
            `api/vehicle_parking/tickets/create`,
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
            return await processRefreshToken(() => addParkingTicket(details));
            
        }
    }
};

export const deleteParkingTicket = async (id) => {
    try {
        const res = await httpRequest.post(
            `api/vehicle_parking/tickets/delete/id`,
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
            return await processRefreshToken(() => deleteParkingTicket(id));
            
        }
    }
};
