
import {EmployeeDto} from "../dtos/employee.dto";
import {db} from '../index';
export const Employee = {
    get: async () => {
        try {
            const employee = await db.select("employees.*", "departments.name as department").from('employees').leftJoin("departments", "employees.department_id", "departments.id");
            return employee;
        } catch (err) {
            throw err;
        }
    },
    findByID: async (id: string) => {
        try {
            const employee = await db('employees').where({ id }).first();
            return employee;
        } catch (err) {
            throw err;
        }
    },
    create: async (details: EmployeeDto) => {
        try {
            const [newEmployee] = await db('employees').insert(details).returning('*');
            return newEmployee;
        } catch (err) {
            throw err;
        }
    },
    updateByID: async (id: string, newDetails: EmployeeDto) => {
        try {
            const [updatedEmployee] = await db('employees').where({ id }).update(newDetails).returning('*');
            return updatedEmployee;
        } catch (err) {
            throw err;
        }
    },
    deleteByID: async (id: string) => {
        try {
            const [deletedEmployee] = await db('employees').where({ id }).del().returning('*');
            return deletedEmployee;
        } catch (err) {
            throw err;
        }
    }
}
