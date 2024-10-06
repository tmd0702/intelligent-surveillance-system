import { Request, Response } from 'express';
const {Location} = require("../models/location.model");
import {LocationDto} from "../dtos/location.dto";

const getLocationById = (req: Request, res: Response) => {
    Location.findByID(req.query.id).then((location: LocationDto) =>
        res.status(200).json({"success": true, "message": "Data successfully queried from the database.", "data": [location]})
    ).catch((error: Error) => {
        res.status(200).json({"success": false, "message": error.message || "Unknown error occurred", "data": []})
    });
}

const getLocations = (req: Request, res: Response) => {
    Location.get().then((locations: LocationDto[]) =>
        res.status(200).json({"success": true, "message": "Data successfully queried from the database.", "data": locations})
    ).catch((error: Error) => {
        res.status(200).json({"success": false, "message": error.message || "Unknown error occurred", "data": []})
    });
}

const createLocation = (req: Request, res: Response) => {
    Location.create(req.body.id, req.body.details).then(async (createdLocation: LocationDto) => {
        res.status(200).json({ "success": true, "message": "Data updated!", "data": [createdLocation] })
    }).catch((error: Error) => {
        res.status(200).json({ "success": false, "message": error.message || "Unknown error occurred", "data": [] })
    })
}
const updateLocationByID = (req: Request, res: Response) => {
    Location.updateByID(req.body.id, req.body.details).then((updatedLocation: LocationDto) => {
        res.status(200).json({ "success": true, "message": "Data updated!", "data": [updatedLocation] })
    }).catch((error: Error) => {
        res.status(200).json({ "success": false, "message": error.message || "Unknown error occurred", "data": [] })
    })
}
const deleteLocationByID = (req: Request, res: Response) => {
    Location.deleteByID(req.body.id, req.body.details).then((deletedLocation: LocationDto) => {
        res.status(200).json({ "success": true, "message": "Data updated!", "data": [deletedLocation] })
    }).catch((error: Error) => {
        res.status(200).json({ "success": false, "message": error.message || "Unknown error occurred", "data": [] })
    })
}
module.exports = {
    getLocationById,
    getLocations,
    updateLocationByID,
    deleteLocationByID,
    createLocation
}