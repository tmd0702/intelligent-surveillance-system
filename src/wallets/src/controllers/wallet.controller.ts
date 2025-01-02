import { Request, Response } from 'express';
import {db} from '../index';
import {kafkaWrapper} from "../kafka-wrapper";
const {Wallet} = require("../models/wallet.model");
import {WalletDto} from "../dtos/wallet.dto";

const getWalletById = (req: Request, res: Response) => {
    Wallet.findByID(req.query.id).then((wallet: WalletDto) =>
        res.status(200).json({"success": true, "message": "Data successfully queried from the database.", "data": [wallet]})
    ).catch((error: Error) => {
        res.status(200).json({"success": false, "message": error.message || "Unknown error occurred", "data": []})
    });
}

const getWalletByUserId = (req: Request, res: Response) => {
    Wallet.findByUserID(req.query.user_id).then((wallet: WalletDto[]) =>
        res.status(200).json({"success": true, "message": "Data successfully queried from the database.", "data": [wallet]})
    ).catch((error: Error) => {
        res.status(200).json({"success": false, "message": error.message || "Unknown error occurred", "data": []})
    });
}

const deposit = (req: Request, res: Response) => {
    Wallet.deposit(req.body.user_id, req.body.amount).then(async (updatedWallet: WalletDto) => {
        res.status(200).json({ "success": true, "message": "Deposit success!", "data": [updatedWallet] })
    }).catch((error: Error) => {
        res.status(200).json({ "success": false, "message": error.message || "Unknown error occurred", "data": [] })
    })
}
const withdraw = (req: Request, res: Response) => {
    Wallet.withdraw(req.body.user_id, req.body.amount).then(async (updatedWallet: WalletDto) => {
        res.status(200).json({ "success": true, "message": "Deposit success!", "data": [updatedWallet] })
    }).catch((error: Error) => {
        res.status(200).json({ "success": false, "message": error.message || "Unknown error occurred", "data": [] })
    })
}

module.exports = {
    getWalletById,
    getWalletByUserId,
    deposit,
    withdraw
}