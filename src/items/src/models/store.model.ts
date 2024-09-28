
import {StoreDto} from "../dtos/store.dto";
import {db} from '../index';
export const Store = {
    findByID: async (id: string) => {
        try {
            const store = await db('stores').where({ id }).first();
            return store;
        } catch (err) {
            throw err;
        }
    },
    create: async (StoreDetails: StoreDto) => {
        try {
            const [newStore] = await db('stores').insert(StoreDetails).returning('*');
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
