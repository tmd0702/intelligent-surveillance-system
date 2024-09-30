import { Request, Response } from 'express';
const {Transaction} = require("../models/transaction.model");
import {TransactionDto} from "../dtos/transaction.dto";
import {db} from '../index';
import {kafkaWrapper} from "../kafka-wrapper";


const getTransactionById = (req: Request, res: Response) => {
    Transaction.findByID(req.query.id).then((transaction: TransactionDto) =>
        res.status(200).json({"success": true, "message": "Data successfully queried from the database.", "data": [transaction]})
    ).catch((error: Error) => {
        res.status(200).json({"success": false, "message": error.message || "Unknown error occurred", "data": []})
    });
}

const getTransactions = (req: Request, res: Response) => {
    Transaction.get().then((transactions: TransactionDto[]) =>
        res.status(200).json({"success": true, "message": "Data successfully queried from the database.", "data": transactions})
    ).catch((error: Error) => {
        res.status(200).json({"success": false, "message": error.message || "Unknown error occurred", "data": []})
    });
}

const createTransaction = (req: Request, res: Response) => {
    Transaction.create(req.body.details).then(async (newTransaction: TransactionDto) => {
        res.status(200).json({ "success": true, "message": "Data updated!", "data": [newTransaction] })
    }).catch((error: Error) => {
        res.status(200).json({ "success": false, "message": error.message || "Unknown error occurred", "data": [] })
    })
}
const updateTransactionByID = (req: Request, res: Response) => {
    Transaction.updateByID(req.body.id, req.body.details).then(async (updatedTransaction: TransactionDto) => {
        res.status(200).json({ "success": true, "message": "Data updated!", "data": [updatedTransaction] })
    }).catch((error: Error) => {
        res.status(200).json({ "success": false, "message": error.message || "Unknown error occurred", "data": [] })
    })
}
const deleteTransactionByID = (req: Request, res: Response) => {
    Transaction.deleteByID(req.body.id, req.body.details).then((deletedTransaction: TransactionDto) => {
        res.status(200).json({ "success": true, "message": "Data updated!", "data": [deletedTransaction] })
    }).catch((error: Error) => {
        res.status(200).json({ "success": false, "message": error.message || "Unknown error occurred", "data": [] })
    })
}
module.exports = {
    getTransactionById,
    getTransactions,
    updateTransactionByID,
    deleteTransactionByID,
    createTransaction
}