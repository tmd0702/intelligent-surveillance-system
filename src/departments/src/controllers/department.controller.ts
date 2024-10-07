import { Request, Response } from 'express';
const {Department} = require("../models/department.model");
import {DepartmentDto} from "../dtos/department.dto";
import {DepartmentCreatedProducer} from "../events/producers/department-created-producer";
import {kafkaWrapper} from "../kafka-wrapper";

const getDepartmentById = (req: Request, res: Response) => {
    Department.findByID(req.query.id).then((department: DepartmentDto) =>
        res.status(200).json({"success": true, "message": "Data successfully queried from the database.", "data": [department]})
    ).catch((error: Error) => {
        res.status(200).json({"success": false, "message": error.message || "Unknown error occurred", "data": []})
    });
}

const getDepartments = (req: Request, res: Response) => {
    Department.get().then((rows: DepartmentDto[]) =>
        res.status(200).json({"success": true, "message": "Data successfully queried from the database.", "data": rows})
    ).catch((error: Error) => {
        res.status(200).json({"success": false, "message": error.message || "Unknown error occurred", "data": []})
    });
}

const createDepartment = (req: Request, res: Response) => {
    Department.create(req.body.details).then(async (createdDepartment: DepartmentDto) => {
        await new DepartmentCreatedProducer(kafkaWrapper.producer).produce({
            id: createdDepartment.id,
            name: createdDepartment.name,
            status: createdDepartment.status
        })
        res.status(200).json({ "success": true, "message": "Data created!", "data": [createdDepartment] })
    }).catch((error: Error) => {
        res.status(200).json({ "success": false, "message": error.message || "Unknown error occurred", "data": [] })
    })
}
const updateDepartmentByID = (req: Request, res: Response) => {
    Department.updateByID(req.body.id, req.body.details).then(async (updatedDepartment: DepartmentDto) => {
        await new DepartmentCreatedProducer(kafkaWrapper.producer).produce({
            id: updatedDepartment.id,
            name: updatedDepartment.name,
            status: updatedDepartment.status
        })
        res.status(200).json({ "success": true, "message": "Data updated!", "data": [updatedDepartment] })
    }).catch((error: Error) => {
        res.status(200).json({ "success": false, "message": error.message || "Unknown error occurred", "data": [] })
    })
}
const deleteDepartmentByID = (req: Request, res: Response) => {
    Department.deleteByID(req.body.id, req.body.details).then((deletedDepartment: DepartmentDto) => {
        res.status(200).json({ "success": true, "message": "Data updated!", "data": [deletedDepartment] })
    }).catch((error: Error) => {
        res.status(200).json({ "success": false, "message": error.message || "Unknown error occurred", "data": [] })
    })
}
module.exports = {
    getDepartmentById,
    getDepartments,
    updateDepartmentByID,
    deleteDepartmentByID,
    createDepartment
}