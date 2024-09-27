import { Request, Response } from 'express';
const User = require("../models/user.model");
import {UserDto} from "../dtos/user.dto";

const getUserById = (req: Request, res: Response) => {
    User.findByID(req.query.id).then((rows: UserDto[]) =>
        res.status(200).json({"success": true, "message": "Data successfully queried from the database.", "data": rows})
    ).catch((error: Error) => {
        res.status(200).json({"success": false, "message": error.message || "Unknown error occurred", "data": []})
    });
}
const getUserByEmail = (req: Request, res: Response) => {
    User.findByEmail(req.query.email).then((rows: UserDto[]) =>
        res.status(200).json({"success": true, "message": "Data successfully queried from the database.", "data": rows})
    ).catch((error: Error) => {
        res.status(200).json({"success": false, "message": error.message || "Unknown error occurred", "data": []})
    });
}

const getUsers = (req: Request, res: Response) => {
    User.get().then((rows: UserDto[]) =>
        res.status(200).json({"success": true, "message": "Data successfully queried from the database.", "data": rows})
    ).catch((error: Error) => {
        res.status(200).json({"success": false, "message": error.message || "Unknown error occurred", "data": []})
    });
}

const updateUserByID = (req: Request, res: Response) => {
    User.updateByID(req.body.id, req.body.details).then((updatedAccount: UserDto) => {
        res.status(200).json({ "success": true, "message": "Data updated!", "data": [updatedAccount] })
    }).catch((error: Error) => {
        res.status(200).json({ "success": false, "message": error.message || "Unknown error occurred", "data": [] })
    })
}
module.exports = {
    getUserById,
    getUsers,
    updateUserByID,
    getUserByEmail
}