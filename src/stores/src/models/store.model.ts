
import {StoreDto} from "../dtos/store.dto";
import {db} from '../index';
export const Store = {
    get: async () => {
        try {
            const stores = await db.select("*").from('stores');
            return stores;
        } catch (err) {
            throw err;
        }
    },
    findByID: async (id: string) => {
        try {
            const store = await db('stores').where({ id }).first();
            return store;
        } catch (err) {
            throw err;
        }
    },
    create: async (details: StoreDto) => {
        try {
            const [newStore] = await db('stores').insert(details).returning('*');
            return newStore;
        } catch (err) {
            throw err;
        }
    },
    updateByID: async (id: string, newDetails: StoreDto) => {
        try {
            const [updatedStore] = await db('stores').where({ id }).update(newDetails).returning('*');
            return updatedStore;
        } catch (err) {
            throw err;
        }
    },
    deleteByID: async (id: string) => {
        try {
            const [deletedStore] = await db('stores').where({ id }).del().returning('*');
            return deletedStore;
        } catch (err) {
            throw err;
        }
    }
}
