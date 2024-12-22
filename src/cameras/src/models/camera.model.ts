
import {CameraDto} from "../dtos/camera.dto";
import {db} from '../index';
export const Camera = {
    get: async () => {
        try {
            const cameras = await db.select("cameras.*", "locations.name as location").from('cameras').leftJoin("locations", "locations.id", "cameras.location_id");
            return cameras;
        } catch (err) {
            throw err;
        }
    },
    findByID: async (id: string) => {
        try {
            const camera = await db('cameras').where({ id }).first();
            return camera;
        } catch (err) {
            throw err;
        }
    },
    create: async (CameraDetails: CameraDto) => {
        try {
            const [newCamera] = await db('cameras').insert(CameraDetails).returning('*');
            return newCamera;
        } catch (err) {
            throw err;
        }
    },
    updateByID: async (id: string, newDetails: CameraDto) => {
        try {
            const [updatedCamera] = await db('cameras').where({ id }).update(newDetails).returning('*');
            return updatedCamera;
        } catch (err) {
            throw err;
        }
    },
    deleteByID: async (id: string) => {
        try {
            const [deletedCamera] = await db('cameras').where({ id }).del().returning('*');
            return deletedCamera;
        } catch (err) {
            throw err;
        }
    }
}
