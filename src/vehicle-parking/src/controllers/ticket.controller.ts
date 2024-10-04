import { Request, Response } from 'express';
const {Ticket} = require("../models/ticket.model");
import {TicketDto} from "../dtos/ticket.dto";

const getTicketById = (req: Request, res: Response) => {
    Ticket.findByID(req.query.id).then((ticket: TicketDto) =>
        res.status(200).json({"success": true, "message": "Data successfully queried from the database.", "data": [ticket]})
    ).catch((error: Error) => {
        res.status(200).json({"success": false, "message": error.message || "Unknown error occurred", "data": []})
    });
}

const getTickets = (req: Request, res: Response) => {
    Ticket.get().then((rows: TicketDto[]) =>
        res.status(200).json({"success": true, "message": "Data successfully queried from the database.", "data": rows})
    ).catch((error: Error) => {
        res.status(200).json({"success": false, "message": error.message || "Unknown error occurred", "data": []})
    });
}

const createTicket = (req: Request, res: Response) => {
    Ticket.create(req.body.id, req.body.details).then(async (createdTicket: TicketDto) => {
        res.status(200).json({ "success": true, "message": "Data updated!", "data": [createdTicket] })
    }).catch((error: Error) => {
        res.status(200).json({ "success": false, "message": error.message || "Unknown error occurred", "data": [] })
    })
}
const updateTicketByID = (req: Request, res: Response) => {
    Ticket.updateByID(req.body.id, req.body.details).then(async (updatedTicket: TicketDto) => {
        res.status(200).json({ "success": true, "message": "Data updated!", "data": [updatedTicket] })
    }).catch((error: Error) => {
        res.status(200).json({ "success": false, "message": error.message || "Unknown error occurred", "data": [] })
    })
}
const deleteTicketByID = (req: Request, res: Response) => {
    Ticket.deleteByID(req.body.id, req.body.details).then((deletedTicket: TicketDto) => {
        res.status(200).json({ "success": true, "message": "Data updated!", "data": [deletedTicket] })
    }).catch((error: Error) => {
        res.status(200).json({ "success": false, "message": error.message || "Unknown error occurred", "data": [] })
    })
}
module.exports = {
    getTicketById,
    getTickets,
    updateTicketByID,
    deleteTicketByID,
    createTicket
}