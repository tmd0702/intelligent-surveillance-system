
import {FrameLogDto} from "../dtos/frame-log.dto";
import {db} from '../index';
export const FrameLog = {
    get: async () => {
        try {
            const frameLog = await db.select("*").from('frame_logs');
            return frameLog;
        } catch (err) {
            throw err;
        }
    },
    findByID: async (id: string) => {
        try {
            const frameLog = await db('frame_logs').where({ id }).first();
            return frameLog;
        } catch (err) {
            throw err;
        }
    },
    create: async (details: FrameLogDto) => {
        try {
            const [newFrameLog] = await db('frame_logs').insert(details).returning('*');
            return newFrameLog;
        } catch (err) {
            throw err;
        }
    },
}
