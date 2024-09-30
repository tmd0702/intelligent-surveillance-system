
import {TransactionDto} from "../dtos/transaction.dto";
import {db} from '../index';
export const Transaction = {
    get: async () => {
        try {
            const transactions = await db.select("*").from('transactions');
            return transactions;
        } catch (err) {
            throw err;
        }
    },
    findByID: async (id: string) => {
        try {
            const transaction = await db('transactions').where({ id }).first();
            return transaction;
        } catch (err) {
            throw err;
        }
    },
    findByUserID: async (userId: string) => {
        try {
            const transactions = await db('transactions').where({ user_id: userId });
            return transactions;
        } catch (err) {
            throw err;
        }
    },
    create: async (details: TransactionDto) => {
        try {
            const [newTransaction] = await db('transactions').insert(details).returning('*');
            return newTransaction;
        } catch (err) {
            throw err;
        }
    },
    updateByID: async (id: string, newDetails: TransactionDto) => {
        try {
            const [updatedTransaction] = await db('transactions').where({ id }).update(newDetails).returning('*');
            return updatedTransaction;
        } catch (err) {
            throw err;
        }
    },
    deleteByID: async (id: string) => {
        try {
            const [deletedTransaction] = await db('transactions').where({ id }).del().returning('*');
            return deletedTransaction;
        } catch (err) {
            throw err;
        }
    }
}
