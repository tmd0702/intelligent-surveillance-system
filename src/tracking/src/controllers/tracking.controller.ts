import { Request, Response } from 'express';
const {FaceRecognitionLog} = require("../models/face-recognition-log.model");
import {FaceRecognitionLogDto} from "../dtos/face-recognition-log.dto";
import {User} from "../models/user.model";
import {extractFaces} from "../face-recog-client";
import {UserDto} from "../dtos/user.dto";

const trackByFaceImage = async (req: Request, res: Response) => {
    const faces = await extractFaces(req.body.b64_data, false);
    if (faces.length == 0 || faces[0].confidence_score == 0) res.status(200).json({ "success": false, "message": "Cannot recognized facial identity. Please retry!", "data": [] });
    else {
        FaceRecognitionLog.findByFaceID(faces[0].face_id).then(async (logs: FaceRecognitionLogDto) => {
            res.status(200).json({ "success": true, "message": "Data successfully queried from the database.", "data": logs })
        }).catch((error: Error) => {
            res.status(200).json({ "success": false, "message": error.message || "Unknown error occurred", "data": [] })
        })
    }
}
const trackByPhoneNumber = (req: Request, res: Response) => {
    FaceRecognitionLog.findByPhoneNumber(req.query.phone_number).then((logs: FaceRecognitionLogDto) =>
        res.status(200).json({"success": true, "message": "Data successfully queried from the database.", "data": logs})
    ).catch((error: Error) => {
        res.status(200).json({"success": false, "message": error.message || "Unknown error occurred", "data": []})
    });
}
const getTodayVisitors = (req: Request, res: Response) => {
    FaceRecognitionLog.getDistinctFaceCountToday().then((visitors: any) =>
        res.status(200).json({"success": true, "message": "Data successfully queried from the database.", "data": visitors})
    ).catch((error: Error) => {
        res.status(200).json({"success": false, "message": error.message || "Unknown error occurred", "data": []})
    });
}
const getMonthlyVisitors = (req: Request, res: Response) => {
    FaceRecognitionLog.getDistinctFaceCountByMonth().then((visitors: any) =>
        res.status(200).json({"success": true, "message": "Data successfully queried from the database.", "data": visitors})
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
const getUserByFaceId = async (req: Request, res: Response) => {
    const faces = await extractFaces(req.body.b64_data, false);

    if (faces.length > 0) {
        const faceId = faces[0].face_id;
        console.log(faces[0].confidence_score, faceId)
        User.findByFaceID(faceId).then((rows: UserDto[]) =>
            res.status(200).json({"success": true, "message": "Data successfully queried from the database.", "data": rows})
        ).catch((error: Error) => {
            res.status(200).json({"success": false, "message": error.message || "Unknown error occurred", "data": []})
        });
    } else {
        res.status(200).json({"success": false, "message": "Face not recognized. Please retry!", "data": []})
    }

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
    trackByFaceImage,
    getUserByFaceId,
    getTodayVisitors,
    getMonthlyVisitors
}