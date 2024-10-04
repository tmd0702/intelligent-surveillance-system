
import {CustomerDto} from "../dtos/customer.dto";
import {db} from '../index';
export const Customer = {
    get: async () => {
        try {
            const customers = await db.select("*").from('customers');
            return customers;
        } catch (err) {
            throw err;
        }
    },
    findByID: async (id: string) => {
        try {
            const customer = await db('customers').where({ id }).first();
            return customer;
        } catch (err) {
            throw err;
        }
    },
    create: async (details: CustomerDto) => {
        try {
            const [newCustomer] = await db('customers').insert(details).returning('*');
            return newCustomer;
        } catch (err) {
            throw err;
        }
    },
    updateByID: async (id: string, newDetails: CustomerDto) => {
        try {
            const [updatedCustomer] = await db('customers').where({ id }).update(newDetails).returning('*');
            return updatedCustomer;
        } catch (err) {
            throw err;
        }
    },
    deleteByID: async (id: string) => {
        try {
            const [deletedCustomer] = await db('customers').where({ id }).del().returning('*');
            return deletedCustomer;
        } catch (err) {
            throw err;
        }
    }
}
