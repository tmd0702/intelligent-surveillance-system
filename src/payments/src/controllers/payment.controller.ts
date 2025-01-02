import {Request, Response} from 'express';
import {PaymentDto} from "../dtos/payment.dto";
import {Order} from "../models/order.model";
import {BadRequestError, NotAuthorizedError, NotFoundError, OrderStatus, PaymentStatus, Ports} from "@softzone/common";
import axios from "axios";
import {PaymentCreatedProducer} from "../events/producers/payment-created-producer";
import {kafkaWrapper} from "../kafka-wrapper";

const {Payment} = require("../models/payment.model");


const getPaymentById = (req: Request, res: Response) => {
    Payment.findByID(req.query.id).then((payment: PaymentDto) =>
        res.status(200).json({"success": true, "message": "Data successfully queried from the database.", "data": [payment]})
    ).catch((error: Error) => {
        res.status(200).json({"success": false, "message": error.message || "Unknown error occurred", "data": []})
    });
}
const getPaymentsByUserId = (req: Request, res: Response) => {
    Payment.findByUserID(req.query.id).then((payments: PaymentDto) =>
        res.status(200).json({"success": true, "message": "Data successfully queried from the database.", "data": payments})
    ).catch((error: Error) => {
        res.status(200).json({"success": false, "message": error.message || "Unknown error occurred", "data": []})
    });
}
const createPayment = async (req: Request, res: Response) => {
    const details = {
        order_id: "",
        user_id: "",
        total_amount: "",
        payment_method: "wallet"
    }
    try {
        const order = await Order.findByID(req.body.details.order_id);
        if (!order) {
            throw new NotFoundError();
        } else {
            if (order.user_id !== req.body.details.user_id) {
                throw new NotAuthorizedError();
            }
            if (order.status === OrderStatus.CANCELLED) {
                throw new BadRequestError('Cannot pay for a cancelled order');
            }
            const newPayment = await Payment.create({...req.body.details, status: PaymentStatus.PENDING});
            axios.post(`http://localhost:${Ports.WALLETS}/api/wallets/withdraw`, {token: req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : null, user_id: req.body.details.user_id, amount: req.body.details.total_amount})
                .then(async (response) => {
                    if (response.data.success) {
                        console.log('Deposit was successful:')
                        const updatedPayment = await Payment.updateByID(newPayment.id, {status: PaymentStatus.COMPLETED});
                        await new PaymentCreatedProducer(kafkaWrapper.producer).produce({
                            id: updatedPayment.id,
                            orderId: updatedPayment.order_id
                        });
                        await Order.updateByID(updatedPayment.order_id, {status: OrderStatus.COMPLETE});
                        res.status(200).json({"success": true, "message": "Payment successfully charged!", "data": [updatedPayment]})
                    } else {
                        console.log('Deposit failed:', response.data.message);
                        const updatedPayment = await Payment.updateByID(newPayment.id, {status: PaymentStatus.FAILED});
                        res.status(200).json({"success": false, "message": response.data?.message, "data": [updatedPayment]})
                    }
                })
                .catch(async (error) => {
                    console.error('Error making the withdraw request:', error.message);
                    const updatedPayment = await Payment.updateByID(newPayment.id, {status: PaymentStatus.FAILED});
                    res.status(200).json({"success": false, "message": error.message, "data": [updatedPayment]})
                });
        }
    } catch(error: any) {
        res.status(200).json({ "success": false, "message": error.message || "Unknown error occurred", "data": [] })
    }
}

module.exports = {
    getPaymentById,
    getPaymentsByUserId,
    createPayment
}