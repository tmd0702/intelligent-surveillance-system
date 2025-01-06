import { Request, Response } from 'express';
const {Employee} = require("../models/employee.model");
import {EmployeeDto} from "../dtos/employee.dto";
import {EmployeeCreatedProducer} from "../events/producers/employee-created-producer";
import {kafkaWrapper} from "../kafka-wrapper";
import {EmployeeUpdatedProducer} from "../events/producers/employee-updated-producer";
import {extractFaces} from "../face-recog-client";

const getEmployeeById = (req: Request, res: Response) => {
    Employee.findByID(req.query.id).then((employee: EmployeeDto) =>
        res.status(200).json({"success": true, "message": "Data successfully queried from the database.", "data": [employee]})
    ).catch((error: Error) => {
        res.status(200).json({"success": false, "message": error.message || "Unknown error occurred", "data": []})
    });
}
const addFace = async (req: Request, res: Response) => {
    const faces = await extractFaces(req.body.b64_data, true);
    if (faces.length > 0) {
        const faceId = faces[0].face_id;
        const byteData = Buffer.from(faces[0].cropped_image, 'base64');
        Employee.updateByID(req.body.id, {byte_data: byteData, face_id: faceId}).then(async (updated: EmployeeDto) => {
            await new EmployeeUpdatedProducer(kafkaWrapper.producer).produce({
                id: updated.id,
                employee_code: updated.employee_code,
                first_name: updated.first_name,
                last_name: updated.last_name,
                phone_number: updated.phone_number,
                email: updated.email,
                position: updated.position,
                address: updated.address,
                department_id: updated.department_id,
                face_id: updated.face_id,
                byte_data: faces[0].cropped_image
            });
            res.status(200).json({"success": true, "message": "Data successfully added to the database.", "data": [updated]})
        }).catch((err: Error) => {
            res.status(200).json({ "success": false, "message": "Update error", "data": [] });
        })

    } else {
        res.status(200).json({"success": false, "message": "Face not recognized. Please retry!", "data": []})
    }

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
    createEmployee,
    addFace
}