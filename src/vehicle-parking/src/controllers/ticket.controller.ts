import {Request, Response} from 'express';
import {TicketDto} from "../dtos/ticket.dto";
import {extractPlate} from "../plate-recog-client";
import {extractFaces} from "../face-recog-client";
import {ParkingTicketStatus} from "@softzone/common";

const {Ticket} = require("../models/ticket.model");

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
const checkIn = async (req: Request, res: Response) => {
    const plate = await extractPlate(req.body.plate_b64);
    const faces = await extractFaces(req.body.face_b64);
    Ticket.create({face_id: faces[0].face_id, plate_number: plate.plate_number, check_in: new Date(), status: ParkingTicketStatus.ACTIVE}).then(async (createdTicket: TicketDto) => {
        res.status(200).json({ "success": true, "message": "Check-in success", "data": [createdTicket] })
    }).catch((error: Error) => {
        res.status(200).json({ "success": false, "message": error.message || "Unknown error occurred", "data": [] })
    })
}
const checkOut = async (req: Request, res: Response) => {
    const plate = await extractPlate(req.body.plate_b64);
    const faces = await extractFaces(req.body.face_b64);
    if (plate.confidence_score == 0 || faces.length == 0) {
        res.status(200).json({ "success": false, "message": "Invalid ticket. Please retry!", "data": [] })
    }
    const existsTicket = await Ticket.findCheckIn(faces[0].face_id, plate.plate_number);
    Ticket.updateByID(existsTicket.id, {face_id: faces[0].face_id, plate_number: plate.plate_number, check_out: new Date(), status: ParkingTicketStatus.ACTIVE}).then(async (createdTicket: TicketDto) => {
        res.status(200).json({ "success": true, "message": "Check-out success", "data": [createdTicket] })
    }).catch((error: Error) => {
        res.status(200).json({ "success": false, "message": error.message || "Unknown error occurred", "data": [] })
    })
}
const createTicket = (req: Request, res: Response) => {
    Ticket.create(req.body.details).then(async (createdTicket: TicketDto) => {
        res.status(200).json({ "success": true, "message": "Data created!", "data": [createdTicket] })
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