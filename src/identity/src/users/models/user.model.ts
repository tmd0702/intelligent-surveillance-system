
import {UserDto} from "../dtos/user.dto";
import {db} from '../../index';
export const User = {
    get: async () => {
        try {
            const users = await db.select("*").from('users');
            return users;
        } catch (err) {
            throw err;
        }
    },
    findByID: async (id: string) => {
        try {
            const user = await db('users').where({ id }).first();
            return user;
        } catch (err) {
            throw err;
        }
    },
    count: async() => {
        try {
            const total = await db('users').count("id as total");
            return total;
        } catch (err) {
            throw err;
        }
    },
    findByEmail: async (email: string) => {
        try {
            const user = await db('users').where({ email }).first();
            return user;
        } catch (err) {
            throw err;
        }
    },
    create: async (userDetails: UserDto) => {
        try {
            const [newUser] = await db('users').insert(userDetails).returning('*');
            return newUser;
        } catch (err) {
            throw err;
        }
    },
    updateByID: async (id: string, newDetails: UserDto) => {
        try {
            const [updatedUser] = await db('users').where({ id }).update(newDetails).returning('*');
            return updatedUser;
        } catch (err) {
            throw err;
        }
    },
    deleteByID: async (id: string) => {
        try {
            const [deletedUser] = await db('users').where({ id }).del().returning('*');
            return deletedUser;
        } catch (err) {
            throw err;
        }
    }
}
