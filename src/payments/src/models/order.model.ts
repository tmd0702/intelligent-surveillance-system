
import {OrderDto} from "../dtos/order.dto";
import {db} from '../index';

export const Order = {
    get: async () => {
        try {
            const orders = await db.select("*").from('orders');
            return orders;
        } catch (err) {
            throw err;
        }
    },
    findByID: async (id: string) => {
        try {
            const order = await db('orders').where({ id }).first();
            return order;
        } catch (err) {
            throw err;
        }
    },
    create: async (details: OrderDto) => {
        try {
            const [newOrder] = await db('orders').insert(details).returning('*');
            return newOrder;
        } catch (err) {
            throw err;
        }
    },
    updateByID: async (id: string, newDetails: OrderDto) => {
        try {
            const [updatedOrder] = await db('orders').where({ id }).update(newDetails).returning('*');
            return updatedOrder;
        } catch (err) {
            throw err;
        }
    },
    deleteByID: async (id: string) => {
        try {
            const [deletedOrder] = await db('orders').where({ id }).del().returning('*');
            return deletedOrder;
        } catch (err) {
            throw err;
        }
    }
}
