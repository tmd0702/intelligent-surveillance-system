
import {PaymentDto} from "../dtos/payment.dto";
import {db} from '../index';
const dayjs = require('dayjs');
export const Payment = {
    get: async () => {
        try {
            const payments = await db.select("*").from('payments');
            return payments;
        } catch (err) {
            throw err;
        }
    },
    todayRevenue: async () => {
        try {
            const today = new Date();
            const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString();
            const endOfDay = new Date(today.setHours(23, 59, 59, 999)).toISOString();

            const result = await db("payments")
                .sum("total_amount as total_revenue")
                .where("status", "completed") // Only include 'completed' payments
                .andWhere("created_at", ">=", startOfDay)
                .andWhere("created_at", "<=", endOfDay);

            return result;
        } catch (error) {
            throw error;
        }
    },
    countSales: async () => {
        const currentDate = dayjs();
        const lastSixMonths = [];

        // Generate the last 6 months in mm/yyyy format
        for (let i = 5; i >= 0; i--) {
            const month = currentDate.subtract(i, "month");
            lastSixMonths.push({
                startOfMonth: month.startOf("month").toISOString(),
                endOfMonth: month.endOf("month").toISOString(),
                formattedMonth: month.format("MM/YYYY"),
            });
        }

        try {
            // Query the database for sales in the last 6 months
            const results = await db("payments")
                .select(
                    db.raw("DATE_TRUNC('month', created_at) AS month"),
                    db.raw("COUNT(*) AS total_payments")
                )
                .where("status", "completed")
                .andWhere("created_at", ">=", lastSixMonths[0].startOfMonth)
                .groupByRaw("DATE_TRUNC('month', created_at)");

            // Map results to an object with month keys
            const salesMap = results.reduce((acc, row) => {
                const formattedMonth = dayjs(row.month).format("MM/YYYY");
                acc[formattedMonth] = parseInt(row.total_payments, 10);
                return acc;
            }, {} as Record<string, number>);

            // Merge with lastSixMonths, filling gaps with 0 sales
            const finalResult = lastSixMonths.map((month) => ({
                month: month.formattedMonth,
                total_payments: salesMap[month.formattedMonth] || 0,
            }));

            return finalResult;
        } catch (error) {
            throw error;
        }
    },
    findByID: async (id: string) => {
        try {
            const payment = await db('payments').where({ id }).first();
            return payment;
        } catch (err) {
            throw err;
        }
    },
    findByUserID: async (userId: string) => {
        try {
            const payments = await db('payments').where({ user_ud: userId });
            return payments;
        } catch (err) {
            throw err;
        }
    },
    create: async (details: PaymentDto) => {
        try {
            const [newPayment] = await db('payments').insert(details).returning('*');
            return newPayment;
        } catch (err) {
            throw err;
        }
    },
    updateByID: async (id: string, newDetails: PaymentDto) => {
        try {
            const [updatedPayment] = await db('payments').where({ id }).update(newDetails).returning('*');
            return updatedPayment;
        } catch (err) {
            throw err;
        }
    },
    deleteByID: async (id: string) => {
        try {
            const [deletedPayment] = await db('payments').where({ id }).del().returning('*');
            return deletedPayment;
        } catch (err) {
            throw err;
        }
    }
}
