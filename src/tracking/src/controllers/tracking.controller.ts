import { Request, Response } from 'express';
const {FaceRecognitionLog} = require("../models/face-recognition-log.model");
import {FaceRecognitionLogDto} from "../dtos/face-recognition-log.dto";

const trackByFaceId = (req: Request, res: Response) => {
    FaceRecognitionLog.findByFaceID(req.query.face_id).then((logs: FaceRecognitionLogDto) =>
        res.status(200).json({"success": true, "message": "Data successfully queried from the database.", "data": logs})
    ).catch((error: Error) => {
        res.status(200).json({"success": false, "message": error.message || "Unknown error occurred", "data": []})
    });
}
const trackByPhoneNumber = (req: Request, res: Response) => {
    FaceRecognitionLog.findByPhoneNumber(req.query.phone_number).then((logs: FaceRecognitionLogDto) =>
        res.status(200).json({"success": true, "message": "Data successfully queried from the database.", "data": logs})
    ).catch((error: Error) => {
        res.status(200).json({"success": false, "message": error.message || "Unknown error occurred", "data": []})
    });
}
const trackByEmail = (req: Request, res: Response) => {
    FaceRecognitionLog.findByEmail(req.query.email).then((logs: FaceRecognitionLogDto) =>
        res.status(200).json({"success": true, "message": "Data successfully queried from the database.", "data": logs})
    ).catch((error: Error) => {
        res.status(200).json({"success": false, "message": error.message || "Unknown error occurred", "data": []})
    });
}
const trackById = (req: Request, res: Response) => {
    FaceRecognitionLog.findByID(req.query.id).then((log: FaceRecognitionLogDto) =>
        res.status(200).json({"success": true, "message": "Data successfully queried from the database.", "data": [log]})
    ).catch((error: Error) => {
        res.status(200).json({"success": false, "message": error.message || "Unknown error occurred", "data": []})
    });
}
module.exports = {
    trackById,
    trackByEmail,
    trackByPhoneNumber,
    trackByFaceId
}