import { Request, Response } from 'express';
const User = require("../models/user.model");
import {UserDto} from "../dtos/user.dto";
import {UserCreatedProducer} from "../../events/producers/user-created-producer";
import {kafkaWrapper} from "../../kafka-wrapper";
import {UserStatus} from "@softzone/common";
import {UserUpdatedProducer} from "../../events/producers/user-updated-producer";

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
    User.updateByID(req.body.id, req.body.details).then(async (updatedAccount: UserDto) => {
        await new UserUpdatedProducer(kafkaWrapper.producer).produce({
            id: updatedAccount.id,
            first_name: updatedAccount.first_name,
            last_name: updatedAccount.last_name,
            phone_number: updatedAccount.phone_number,
            email: updatedAccount.email
        });
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