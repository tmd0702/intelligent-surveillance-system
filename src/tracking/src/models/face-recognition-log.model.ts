
import {FaceRecognitionLogDto} from "../dtos/face-recognition-log.dto";
import {db} from '../index';
const fs = require("fs");
export const FaceRecognitionLog = {
    get: async () => {
        try {
            const faceRecognitionLog = await db.select("*").from('face_recognition_logs');
            return faceRecognitionLog;
        } catch (err) {
            throw err;
        }
    },
    getDistinctFaceCountByMonth: async () => {
        try {
            const today = new Date();
            const results = [];

            for (let i = 5; i >= 0; i--) {
                const monthStart = new Date(today.getFullYear(), today.getMonth() - i, 1, 0, 0, 0, 0);
                const monthEnd = new Date(today.getFullYear(), today.getMonth() - i + 1, 0, 23, 59, 59, 999);

                const adjustedStart = new Date(monthStart.getTime() + 7 * 60 * 60 * 1000);
                const adjustedEnd = new Date(monthEnd.getTime() + 7 * 60 * 60 * 1000);

                console.log(`Month: ${adjustedStart.toISOString()} - ${adjustedEnd.toISOString()}`);

                const result = await db("face_recognition_logs")
                    .countDistinct("face_id as visitors")
                    .where("recognized_at", ">=", adjustedStart)
                    .andWhere("recognized_at", "<=", adjustedEnd);

                const formattedMonth = `${(adjustedStart.getMonth() + 1).toString().padStart(2, '0')}/${adjustedStart.getFullYear()}`;

                results.push({
                    month: formattedMonth, // Format as mm/yyyy
                    visitors: result[0].visitors || 0,
                });
            }

            return results;
        } catch (error) {
            throw error;
        }
    },
    getDistinctFaceCountToday: async () => {
        try {
            const today = new Date();
            let startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);
            let endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999);
            startOfDay = new Date(startOfDay.getTime() + 7 * 60 * 60 * 1000);
            endOfDay = new Date(endOfDay.getTime() + 7 * 60 * 60 * 1000);
            // console.log("Start of Day (Local):", startOfDay);
            // console.log("End of Day (Local):", endOfDay);

            const result = await db("face_recognition_logs")
                .countDistinct("face_id as visitors")
                .where("recognized_at", ">=", startOfDay)
                .andWhere("recognized_at", "<=", endOfDay);

            return result;
        } catch (error) {
            throw error;
        }
    },
    findByID: async (id: string) => {
        try {
            const faceRecognitionLog = await db('face_recognition_logs').where({ id }).first();
            return faceRecognitionLog;
        } catch (err) {
            throw err;
        }
    },
    findByFaceID: async (faceId: string) => {
        try {
            const faceRecognitionLogs = await db('face_recognition_logs')
                .join('users', 'face_recognition_logs.face_id', 'users.face_id')
                .leftJoin("cameras", "cameras.id", "face_recognition_logs.camera_id")
                .leftJoin('frame_logs', "frame_logs.id", "face_recognition_logs.frame_id")
                .select('face_recognition_logs.*', 'users.email as email', "frame_logs.byte_data as frame_byte_data", 'users.phone_number as phone_number', 'users.first_name as first_name', 'users.last_name as last_name', "cameras.name as camera")
                .where({ face_id: faceId })
                .orderBy('recognized_at', 'desc');
            return faceRecognitionLogs;
        } catch (err) {
            throw err;
        }
    },
    findByEmail: async (email: string) => {
        try {
            const faceRecognitionLogs = await db('face_recognition_logs')
                .join('users', 'face_recognition_logs.face_id', 'users.face_id')
                .leftJoin("cameras", "cameras.id", "face_recognition_logs.camera_id")
                .leftJoin('frame_logs', "frame_logs.id", "face_recognition_logs.frame_id")
                .select('face_recognition_logs.*', 'users.email as email', "frame_logs.byte_data as frame_byte_data", 'users.phone_number as phone_number', 'users.first_name as first_name', 'users.last_name as last_name', "cameras.name as camera")
                .where('users.email', email)
                .orderBy('face_recognition_logs.recognized_at', 'desc');
            return faceRecognitionLogs;
        } catch (err) {
            throw err;
        }
    },
    findByPhoneNumber: async (phoneNumber: string) => {
        try {
            const faceRecognitionLogs = await db('face_recognition_logs')
                .join('users', 'face_recognition_logs.face_id', 'users.face_id')
                .leftJoin("cameras", "cameras.id", "face_recognition_logs.camera_id")
                .leftJoin("frame_logs", "frame_logs.id", "face_recognition_logs.frame_id")
                .select('face_recognition_logs.*', 'users.phone_number as phone_number', 'users.email as email', "frame_logs.byte_data as frame_byte_data",  'users.first_name as first_name', 'users.last_name as last_name', 'cameras.name as camera')
                .where('users.phone_number', phoneNumber)
                .orderBy('face_recognition_logs.recognized_at', 'desc');
            return faceRecognitionLogs;
        } catch (err) {
            throw err;
        }
    },
    create: async (details: FaceRecognitionLogDto) => {
        try {
            const [newFaceRecognitionLog] = await db('face_recognition_logs').insert(details).returning('*');
            return newFaceRecognitionLog;
        } catch (err) {
            throw err;
        }
    },
}
