import { Request, Response } from 'express';
const {Location} = require("../models/location.model");
import {LocationDto} from "../dtos/location.dto";
import {LocationUpdatedProducer} from "../events/producers/location-updated-producer";
import {LocationCreatedProducer} from "../events/producers/location-created-producer";
import {kafkaWrapper} from "../kafka-wrapper";

const getLocationById = (req: Request, res: Response) => {
    Location.findByID(req.query.id).then((Location: LocationDto) =>
        res.status(200).json({"success": true, "message": "Data successfully queried from the database.", "data": [Location]})
    ).catch((error: Error) => {
        res.status(200).json({"success": false, "message": error.message || "Unknown error occurred", "data": []})
    });
}

const getLocations = (req: Request, res: Response) => {
    Location.get().then((rows: LocationDto[]) =>
        res.status(200).json({"success": true, "message": "Data successfully queried from the database.", "data": rows})
    ).catch((error: Error) => {
        res.status(200).json({"success": false, "message": error.message || "Unknown error occurred", "data": []})
    });
}

const createLocation = (req: Request, res: Response) => {
    Location.create(req.body.details).then(async (createdLocation: LocationDto) => {
        await new LocationCreatedProducer(kafkaWrapper.producer).produce({
            id: createdLocation.id,
            name: createdLocation.name,
            address: createdLocation.address,
            floor_number: createdLocation.floor_number,
            zone_name: createdLocation.zone_name
        })
        res.status(200).json({ "success": true, "message": "Data created!", "data": [createdLocation] })
    }).catch((error: Error) => {
        res.status(200).json({ "success": false, "message": error.message || "Unknown error occurred", "data": [] })
    })
}
const updateLocationByID = (req: Request, res: Response) => {
    Location.updateByID(req.body.id, req.body.details).then(async (updatedLocation: LocationDto) => {
        await new LocationUpdatedProducer(kafkaWrapper.producer).produce({
            id: updatedLocation.id,
            name: updatedLocation.name,
            address: updatedLocation.address,
            floor_number: updatedLocation.floor_number,
            zone_name: updatedLocation.zone_name
        })
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