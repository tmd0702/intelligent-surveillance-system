
import {TicketDto} from "../dtos/ticket.dto";
import {db} from '../index';
import {ParkingTicketStatus} from "@softzone/common";
export const Ticket = {
    get: async () => {
        try {
            const tickets = await db.select("tickets.*", "users.first_name", "users.last_name", "users.email", "users.phone_number").from('tickets').leftJoin("users", "users.face_id", "tickets.face_id");
            return tickets;
        } catch (err) {
            throw err;
        }
    },
    findByID: async (id: string) => {
        try {
            const ticket = await db('tickets').where({ id }).first();
            return ticket;
        } catch (err) {
            throw err;
        }
    },
    findCheckIn: async (faceId: string, plateNumber: string) => {
        try {
            const ticket = await db('tickets').where({ status: ParkingTicketStatus.ACTIVE, face_id: faceId, plate_number: plateNumber }).orderBy('check_in', 'desc').first();
            return ticket;
        } catch (err) {
            throw err;
        }
    },
    findCheckOut: async (faceId: string, plateNumber: string) => {
        try {
            const ticket = await db('tickets').where({ status: ParkingTicketStatus.COMPLETED, face_id: faceId, plate_number: plateNumber }).orderBy('check_out', 'desc').first();
            return ticket;
        } catch (err) {
            throw err;
        }
    },
    create: async (details: TicketDto) => {
        // console.log('details', details)
        try {
            const [newTicket] = await db('tickets').insert(details).returning('*');
            return newTicket;
        } catch (err) {
            throw err;
        }
    },
    updateByID: async (id: string, newDetails: TicketDto) => {
        try {
            const [updatedTicket] = await db('tickets').where({ id }).update(newDetails).returning('*');
            return updatedTicket;
        } catch (err) {
            throw err;
        }
    },
    deleteByID: async (id: string) => {
        try {
            const [deletedTicket] = await db('tickets').where({ id }).del().returning('*');
            return deletedTicket;
        } catch (err) {
            throw err;
        }
    }
}
