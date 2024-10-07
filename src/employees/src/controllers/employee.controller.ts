import { Request, Response } from 'express';
const {Employee} = require("../models/employee.model");
import {EmployeeDto} from "../dtos/employee.dto";
import {EmployeeCreatedProducer} from "../events/producers/employee-created-producer";
import {kafkaWrapper} from "../kafka-wrapper";
import {EmployeeUpdatedProducer} from "../events/producers/employee-updated-producer";

const getEmployeeById = (req: Request, res: Response) => {
    Employee.findByID(req.query.id).then((employee: EmployeeDto) =>
        res.status(200).json({"success": true, "message": "Data successfully queried from the database.", "data": [employee]})
    ).catch((error: Error) => {
        res.status(200).json({"success": false, "message": error.message || "Unknown error occurred", "data": []})
    });
}

const getEmployees = (req: Request, res: Response) => {
    Employee.get().then((rows: EmployeeDto[]) =>
        res.status(200).json({"success": true, "message": "Data successfully queried from the database.", "data": rows})
    ).catch((error: Error) => {
        res.status(200).json({"success": false, "message": error.message || "Unknown error occurred", "data": []})
    });
}

const createEmployee = (req: Request, res: Response) => {
    Employee.create(req.body.details).then(async (createdEmployee: EmployeeDto) => {
        await new EmployeeCreatedProducer(kafkaWrapper.producer).produce(createdEmployee);
        res.status(200).json({ "success": true, "message": "Data created!", "data": [createdEmployee] })
    }).catch((error: Error) => {
        res.status(200).json({ "success": false, "message": error.message || "Unknown error occurred", "data": [] })
    })
}
const updateEmployeeByID = (req: Request, res: Response) => {
    Employee.updateByID(req.body.id, req.body.details).then(async (updatedEmployee: EmployeeDto) => {
        await new EmployeeUpdatedProducer(kafkaWrapper.producer).produce(updatedEmployee);
        res.status(200).json({ "success": true, "message": "Data updated!", "data": [updatedEmployee] })
    }).catch((error: Error) => {
        res.status(200).json({ "success": false, "message": error.message || "Unknown error occurred", "data": [] })
    })
}
const deleteEmployeeByID = (req: Request, res: Response) => {
    Employee.deleteByID(req.body.id, req.body.details).then((deletedEmployee: EmployeeDto) => {
        res.status(200).json({ "success": true, "message": "Data updated!", "data": [deletedEmployee] })
    }).catch((error: Error) => {
        res.status(200).json({ "success": false, "message": error.message || "Unknown error occurred", "data": [] })
    })
}
module.exports = {
    getEmployeeById,
    getEmployees,
    updateEmployeeByID,
    deleteEmployeeByID,
    createEmployee
}