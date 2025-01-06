
import {DepartmentDto} from "../dtos/department.dto";
import {db} from '../index';
export const Department = {
    get: async () => {
        try {
            const departments = await db.select("*").from('departments').orderBy('created_at', 'desc');
            return departments;
        } catch (err) {
            throw err;
        }
    },
    findByID: async (id: string) => {
        try {
            const department = await db('departments').where({ id }).first();
            return department;
        } catch (err) {
            throw err;
        }
    },
    create: async (details: DepartmentDto) => {
        try {
            const [newDepartment] = await db('departments').insert(details).returning('*');
            return newDepartment;
        } catch (err) {
            throw err;
        }
    },
    updateByID: async (id: string, newDetails: DepartmentDto) => {
        try {
            const [updatedDepartment] = await db('departments').where({ id }).update(newDetails).returning('*');
            return updatedDepartment;
        } catch (err) {
            throw err;
        }
    },
    deleteByID: async (id: string) => {
        try {
            const [deletedDepartment] = await db('departments').where({ id }).del().returning('*');
            return deletedDepartment;
        } catch (err) {
            throw err;
        }
    }
}
