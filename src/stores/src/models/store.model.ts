
import {StoreDto} from "../dtos/store.dto";
import {db} from '../index';
export const Store = {
    get: async () => {
        try {
            const stores = await db.select("stores.*", "store_categories.name as category").from('stores').leftJoin("store_categories", "stores.category_id", "store_categories.id").orderBy('stores.created_at', 'desc')
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
            console.log('err:', err);
            throw err;
        }
    },
    updateByID: async (id: string, newDetails: StoreDto) => {
        try {
            const [updatedStore] = await db('stores').where({ id }).update(newDetails).returning('*');
            return updatedStore;
        } catch (err) {
            console.log('err:', err);
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
