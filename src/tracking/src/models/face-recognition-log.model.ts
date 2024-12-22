
import {FaceRecognitionLogDto} from "../dtos/face-recognition-log.dto";
import {db} from '../index';
export const FaceRecognitionLog = {
    get: async () => {
        try {
            const faceRecognitionLog = await db.select("*").from('face_recognition_logs');
            return faceRecognitionLog;
        } catch (err) {
            throw err;
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
            const faceRecognitionLogs = await db('face_recognition_logs').where({ face_id: faceId }).orderBy('recognized_at', 'desc');
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
                .select('face_recognition_logs.*', 'users.email as email', 'users.phone_number as phone_number', "cameras.name as camera")
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
                .select('face_recognition_logs.*', 'users.phone_number as phone_number', 'users.email as email', 'cameras.name as camera')
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
