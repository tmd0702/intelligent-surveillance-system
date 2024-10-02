
import {AttendanceDto} from "../dtos/attendance.dto";
import {db} from '../index';
export const Attendance = {
    get: async () => {
        try {
            const attendances = await db.select("*").from('attendances');
            return attendances;
        } catch (err) {
            throw err;
        }
    },
    findByID: async (id: string) => {
        try {
            const attendance = await db('attendances').where({ id }).first();
            return attendance;
        } catch (err) {
            throw err;
        }
    },
    findByEmployeeID: async (employeeId: string) => {
        try {
            const attendances = await db('attendances').where({ employee_id: employeeId });
            return attendances;
        } catch (err) {
            throw err;
        }
    },
    create: async (details: AttendanceDto) => {
        try {
            const [newAttendance] = await db('attendances').insert(details).returning('*');
            return newAttendance;
        } catch (err) {
            throw err;
        }
    },
    updateByID: async (id: string, newDetails: AttendanceDto) => {
        try {
            const [updatedAttendance] = await db('attendances').where({ id }).update(newDetails).returning('*');
            return updatedAttendance;
        } catch (err) {
            throw err;
        }
    },
    deleteByID: async (id: string) => {
        try {
            const [deletedAttendance] = await db('attendances').where({ id }).del().returning('*');
            return deletedAttendance;
        } catch (err) {
            throw err;
        }
    }
}
