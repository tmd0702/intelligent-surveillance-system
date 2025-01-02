import {Request, Response} from 'express';
import {TicketDto} from "../dtos/ticket.dto";
import {extractPlates} from "../plate-recog-client";
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
    const faces = await extractFaces(req.body.details.face_b64, false);
    const plate = await extractPlates(req.body.details.plate_b64);
    if (faces.length == 0 || plate.plate_number == '') res.status(200).json({ "success": false, "message": "Cannot recognized identity or plate number. Please retry!", "data": [] });
    else {
        // console.log('plate:', plate);
        Ticket.create({face_id: faces[0].face_id, face_checkin_byte_data: Buffer.from(faces[0].cropped_image, 'base64'), plate_checkin_byte_data: Buffer.from(plate.cropped_image, 'base64'), plate_number: plate.plate_number, check_in: new Date(), status: ParkingTicketStatus.ACTIVE}).then(async (createdTicket: TicketDto) => {
            res.status(200).json({ "success": true, "message": "Check-in success", "data": [createdTicket] })
        }).catch((error: Error) => {
            res.status(200).json({ "success": false, "message": error.message || "Unknown error occurred", "data": [] })
        })
    }
}
const checkOut = async (req: Request, res: Response) => {
    const plate = await extractPlates(req.body.details.plate_b64);
    const faces = await extractFaces(req.body.details.face_b64, false);
    if (plate.plate_number == '' || faces.length == 0) {
        res.status(200).json({ "success": false, "message": "Invalid ticket. Please retry!", "data": [] })
    }
    const existsTicket = await Ticket.findCheckIn(faces[0].face_id, plate.plate_number);
    Ticket.updateByID(existsTicket.id, {face_id: faces[0].face_id, plate_number: plate.plate_number, check_out: new Date(), status: ParkingTicketStatus.ACTIVE, face_checkout_byte_data: Buffer.from(faces[0].cropped_image, 'base64'), plate_checkout_byte_data: Buffer.from(plate.cropped_image, 'base64')}).then(async (createdTicket: TicketDto) => {
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
    createTicket,
    checkIn,
    checkOut

}