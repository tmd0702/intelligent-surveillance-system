import { Request, Response } from 'express';
import EventModel from "../models/event.model";
import {IEvent} from "../models/event.model";

interface TimestampConfig {
    $gte?: any;
    $lt?: any;
}

const getEventsInRange = (req: Request, res: Response) => {
    const {startTime, endTime} = req.query;
    let timestampConfig: TimestampConfig = {};
    if (startTime) timestampConfig['$gte'] = startTime;
    if (endTime) timestampConfig['$lt'] = endTime;
    EventModel.find({
        timestamp: timestampConfig
    }).then((events: IEvent[]) =>
        res.status(200).json({"success": true, "message": "Data successfully queried from the database.", "data": events})
    ).catch((error: Error) => {
        res.status(200).json({"success": false, "message": error.message || "Unknown error occurred", "data": []})
    });
}
const getEvents = (req: Request, res: Response) => {
    EventModel.find().then((events: IEvent[]) =>
        res.status(200).json({"success": true, "message": "Data successfully queried from the database.", "data": events})
    ).catch((error: Error) => {
        res.status(200).json({"success": false, "message": error.message || "Unknown error occurred", "data": []})
    });
}

module.exports = {
    getEventsInRange,
    getEvents
}