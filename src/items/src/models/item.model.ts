
import {ItemDto} from "../dtos/item.dto";
import {db} from '../index';
export const Item = {
    get: async () => {
        try {
            const items = await db.select(
                'items.*',
                'stores.name as store',
                'item-categories.name as category'
            )
                .from('items')
                .leftJoin('stores', 'items.store_id', 'stores.id')
                .leftJoin('item-categories', 'items.category_id', 'item-categories.id');
            return items;
        } catch (err) {
            throw err;
        }
    },
    findByID: async (id: string) => {
        try {
            const item = await db.select(
                'items.*',
                'stores.name as store',
                'item-categories.name as category'
            )
                .from('items')
                .leftJoin('stores', 'items.store_id', 'stores.id')
                .leftJoin('item-categories', 'items.category_id', 'item-categories.id').where({ id }).first();
            return item;
        } catch (err) {
            throw err;
        }
    },
    findByStoreID: async (storeId: string) => {
        try {
            const item = await db.select(
                'items.*',
                'stores.name as store',
                'item-categories.name as category'
            )
                .from('items')
                .leftJoin('stores', 'items.store_id', 'stores.id')
                .leftJoin('item-categories', 'items.category_id', 'item-categories.id').where({store_id: storeId });
            return item;
        } catch (err) {
            throw err;
        }
    },

    create: async (ItemDetails: ItemDto) => {
        try {
            const [newItem] = await db('items').insert(ItemDetails).returning('*');
            return newItem;
        } catch (err) {
            throw err;
        }
    },
    updateByID: async (id: string, newDetails: ItemDto) => {
        try {
            const [updatedItem] = await db('items').where({ id }).update(newDetails).returning('*');
            return updatedItem;
        } catch (err) {
            throw err;
        }
    },
    deleteByID: async (id: string) => {
        try {
            const [deletedItem] = await db('items').where({ id }).del().returning('*');
            return deletedItem;
        } catch (err) {
            throw err;
        }
    }
}
