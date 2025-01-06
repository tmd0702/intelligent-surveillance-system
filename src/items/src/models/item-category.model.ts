
import {ItemCategoryDto} from "../dtos/item-category.dto";
import {db} from '../index';
export const Category = {
    get: async () => {
        try {
            const categories = await db.select("*").from('item-categories').orderBy('created_at', 'desc');
            return categories;
        } catch (err) {
            throw err;
        }
    },
    findByID: async (id: string) => {
        try {
            const category = await db('item-categories').where({ id }).first();
            return category;
        } catch (err) {
            throw err;
        }
    },
    create: async (categoryDetails: ItemCategoryDto) => {
        try {
            const [newCategory] = await db('item-categories').insert(categoryDetails).returning('*');
            return newCategory;
        } catch (err) {
            throw err;
        }
    },
    updateByID: async (id: string, newDetails: ItemCategoryDto) => {
        try {
            const [updatedCategory] = await db('item-categories').where({ id }).update(newDetails).returning('*');
            return updatedCategory;
        } catch (err) {
            throw err;
        }
    },
    deleteByID: async (id: string) => {
        try {
            const [deletedCategory] = await db('item-categories').where({ id }).del().returning('*');
            return deletedCategory;
        } catch (err) {
            throw err;
        }
    }
}
