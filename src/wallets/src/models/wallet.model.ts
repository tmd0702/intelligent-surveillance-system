
import {WalletDto} from "../dtos/wallet.dto";
import {db} from '../index';
import {TransactionStatus} from "../types/transaction-status";

export const Wallet = {
    findByID: async (id: string) => {
        try {
            const wallet = await db('wallets').where({ id }).first();
            return wallet;
        } catch (err) {
            throw err;
        }
    },
    findByUserID: async (userId: string) => {
        try {
            const wallet = await db('wallets').where({ user_id: userId }).first();
            return wallet;
        } catch (err) {
            throw err;
        }
    },
    create: async (details: WalletDto) => {
        try {
            const [newWallet] = await db('wallets').insert(details).returning('*');
            return newWallet;
        } catch (err) {
            throw err;
        }
    },
    deposit: async (userId: string, amount: number) => {
        try {
            return await db.transaction(async (trx: any) => {
                const wallet = await trx('wallets')
                    .where({ user_id: userId })
                    .forUpdate()
                    .first();

                if (!wallet) {
                    throw new Error('User not found');
                }

                const newBalance = wallet.balance + amount;

                const [updatedWallet] = await trx('wallets')
                    .where({ user_id: userId })
                    .update({ balance: newBalance })
                    .returning('*');

                await trx('transactions').insert({
                    user_id: userId,
                    transaction_type: 'deposit',
                    description: `Deposit of ${amount} from Stripe`,
                    amount: amount,
                    balance_after: newBalance,
                    status: TransactionStatus.COMPLETED,
                });

                return updatedWallet;
            });
        } catch (err) {
            throw err;
        }
    },
    withdraw: async (userId: string, amount: number) => {
        try {
            return await db.transaction(async (trx: any) => {
                const wallet = await trx('wallets')
                    .where({ user_id: userId })
                    .forUpdate()
                    .first();

                if (!wallet) {
                    throw new Error('User not found');
                }

                if (wallet.balance < amount) {
                    throw new Error('Insufficient balance');
                }

                const newBalance = wallet.balance - amount;

                const [updatedWallet] = await trx('wallets')
                    .where({ user_id: userId })
                    .update({ balance: newBalance })
                    .returning('*');

                await trx('transactions').insert({
                    user_id: userId,
                    transaction_type: 'withdraw',
                    description: `Withdrawal of ${amount}`,
                    amount: amount,
                    balance_after: newBalance,
                    status: TransactionStatus.COMPLETED,
                });

                return updatedWallet;
            });
        } catch (err) {
            throw err;
        }
    }
}
