import { Request, Response } from 'express';
const {Attendance} = require("../models/attendance.model");
import {AttendanceDto} from "../dtos/attendance.dto";

const getAttendanceById = (req: Request, res: Response) => {
    Attendance.findByID(req.query.id).then((attendance: AttendanceDto) =>
        res.status(200).json({"success": true, "message": "Data successfully queried from the database.", "data": [attendance]})
    ).catch((error: Error) => {
        res.status(200).json({"success": false, "message": error.message || "Unknown error occurred", "data": []})
    });
}
const getAttendancesByEmployeeId = (req: Request, res: Response) => {
    Attendance.findByEmployeeID(req.query.employee_id).then((attendances: AttendanceDto[]) =>
        res.status(200).json({"success": true, "message": "Data successfully queried from the database.", "data": attendances})
    ).catch((error: Error) => {
        res.status(200).json({"success": false, "message": error.message || "Unknown error occurred", "data": []})
    });
}
const getAttendances = (req: Request, res: Response) => {
    Attendance.get().then((attendances: AttendanceDto[]) =>
        res.status(200).json({"success": true, "message": "Data successfully queried from the database.", "data": attendances})
    ).catch((error: Error) => {
        res.status(200).json({"success": false, "message": error.message || "Unknown error occurred", "data": []})
    });
}

const createAttendance = (req: Request, res: Response) => {
    Attendance.create(req.body.id, req.body.details).then(async (createdAttendance: AttendanceDto) => {
        res.status(200).json({ "success": true, "message": "Data updated!", "data": [createdAttendance] })
    }).catch((error: Error) => {
        res.status(200).json({ "success": false, "message": error.message || "Unknown error occurred", "data": [] })
    })
}
const updateAttendanceByID = (req: Request, res: Response) => {
    Attendance.updateByID(req.body.id, req.body.details).then(async (updatedAttendance: AttendanceDto) => {
        res.status(200).json({ "success": true, "message": "Data updated!", "data": [updatedAttendance] })
    }).catch((error: Error) => {
        res.status(200).json({ "success": false, "message": error.message || "Unknown error occurred", "data": [] })
    })
}
const deleteAttendanceByID = (req: Request, res: Response) => {
    Attendance.deleteByID(req.body.id, req.body.details).then((deletedAttendance: AttendanceDto) => {
        res.status(200).json({ "success": true, "message": "Data updated!", "data": [deletedAttendance] })
    }).catch((error: Error) => {
        res.status(200).json({ "success": false, "message": error.message || "Unknown error occurred", "data": [] })
    })
}
module.exports = {
    getAttendanceById,
    getAttendances,
    updateAttendanceByID,
    deleteAttendanceByID,
    createAttendance,
    getAttendancesByEmployeeId
}