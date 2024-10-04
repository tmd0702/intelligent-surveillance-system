
import {TicketDto} from "../dtos/ticket.dto";
import {db} from '../index';
export const Ticket = {
    get: async () => {
        try {
            const tickets = await db.select("*").from('tickets');
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
    create: async (details: TicketDto) => {
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
