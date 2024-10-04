
import {LocationDto} from "../dtos/location.dto";
import {db} from "../index";
export const Location = {
    get: async () => {
        try {
            const locations = await db.select("*").from('locations');
            return locations;
        } catch (err) {
            throw err;
        }
    },
    findByID: async (id: string) => {
        try {
            const location = await db('locations').where({ id }).first();
            return location;
        } catch (err) {
            throw err;
        }
    },
    create: async (details: LocationDto) => {
        try {
            const [newLocation] = await db('locations').insert(details).returning('*');
            return newLocation;
        } catch (err) {
            throw err;
        }
    },
    updateByID: async (id: string, newDetails: LocationDto) => {
        try {
            const [updatedLocation] = await db('locations').where({ id }).update(newDetails).returning('*');
            return updatedLocation;
        } catch (err) {
            throw err;
        }
    },
    deleteByID: async (id: string) => {
        try {
            const [deletedLocation] = await db('locations').where({ id }).del().returning('*');
            return deletedLocation;
        } catch (err) {
            throw err;
        }
    }
}
