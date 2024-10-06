import { Request, Response } from 'express';
const {Camera} = require("../models/camera.model");
import {CameraDto} from "../dtos/camera.dto";

const getCameraById = (req: Request, res: Response) => {
    Camera.findByID(req.query.id).then((camera: CameraDto) =>
        res.status(200).json({"success": true, "message": "Data successfully queried from the database.", "data": [camera]})
    ).catch((error: Error) => {
        res.status(200).json({"success": false, "message": error.message || "Unknown error occurred", "data": []})
    });
}

const getCameras = (req: Request, res: Response) => {
    Camera.get().then((cameras: CameraDto[]) =>
        res.status(200).json({"success": true, "message": "Data successfully queried from the database.", "data": cameras})
    ).catch((error: Error) => {
        res.status(200).json({"success": false, "message": error.message || "Unknown error occurred", "data": []})
    });
}

const createCamera = (req: Request, res: Response) => {
    Camera.create(req.body.id, req.body.details).then(async (createdCamera: CameraDto) => {
        res.status(200).json({ "success": true, "message": "Data updated!", "data": [createdCamera] })
    }).catch((error: Error) => {
        res.status(200).json({ "success": false, "message": error.message || "Unknown error occurred", "data": [] })
    })
}
const updateCameraByID = (req: Request, res: Response) => {
    Camera.updateByID(req.body.id, req.body.details).then(async (updatedCamera: CameraDto) => {
        res.status(200).json({ "success": true, "message": "Data updated!", "data": [updatedCamera] })
    }).catch((error: Error) => {
        res.status(200).json({ "success": false, "message": error.message || "Unknown error occurred", "data": [] })
    })
}
const deleteCameraByID = (req: Request, res: Response) => {
    Camera.deleteByID(req.body.id, req.body.details).then((deletedCamera: CameraDto) => {
        res.status(200).json({ "success": true, "message": "Data updated!", "data": [deletedCamera] })
    }).catch((error: Error) => {
        res.status(200).json({ "success": false, "message": error.message || "Unknown error occurred", "data": [] })
    })
}
module.exports = {
    getCameraById,
    getCameras,
    updateCameraByID,
    deleteCameraByID,
    createCamera
}