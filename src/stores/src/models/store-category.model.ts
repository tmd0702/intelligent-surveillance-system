
import {StoreCategoryDto} from "../dtos/store-category.dto";
import {db} from '../index';
export const Category = {
    get: async () => {
        try {
            const categories = await db.select("*").from('store-categories');
            return categories;
        } catch (err) {
            throw err;
        }
    },
    findByID: async (id: string) => {
        try {
            const category = await db('store-categories').where({ id }).first();
            return category;
        } catch (err) {
            throw err;
        }
    },
    create: async (categoryDetails: StoreCategoryDto) => {
        try {
            const [newCategory] = await db('store-categories').insert(categoryDetails).returning('*');
            return newCategory;
        } catch (err) {
            throw err;
        }
    },
    updateByID: async (id: string, newDetails: StoreCategoryDto) => {
        try {
            const [updatedCategory] = await db('store-categories').where({ id }).update(newDetails).returning('*');
            return updatedCategory;
        } catch (err) {
            throw err;
        }
    },
    deleteByID: async (id: string) => {
        try {
            const [deletedCategory] = await db('store-categories').where({ id }).del().returning('*');
            return deletedCategory;
        } catch (err) {
            throw err;
        }
    }
}
