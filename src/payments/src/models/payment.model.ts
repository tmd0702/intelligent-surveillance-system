
import {PaymentDto} from "../dtos/payment.dto";
import {db} from '../index';
export const Payment = {
    get: async () => {
        try {
            const payments = await db.select("*").from('payments');
            return payments;
        } catch (err) {
            throw err;
        }
    },
    findByID: async (id: string) => {
        try {
            const payment = await db('payments').where({ id }).first();
            return payment;
        } catch (err) {
            throw err;
        }
    },
    findByUserID: async (userId: string) => {
        try {
            const payments = await db('payments').where({ user_ud: userId });
            return payments;
        } catch (err) {
            throw err;
        }
    },
    create: async (details: PaymentDto) => {
        try {
            const [newPayment] = await db('payments').insert(details).returning('*');
            return newPayment;
        } catch (err) {
            throw err;
        }
    },
    updateByID: async (id: string, newDetails: PaymentDto) => {
        try {
            const [updatedPayment] = await db('payments').where({ id }).update(newDetails).returning('*');
            return updatedPayment;
        } catch (err) {
            throw err;
        }
    },
    deleteByID: async (id: string) => {
        try {
            const [deletedPayment] = await db('payments').where({ id }).del().returning('*');
            return deletedPayment;
        } catch (err) {
            throw err;
        }
    }
}
