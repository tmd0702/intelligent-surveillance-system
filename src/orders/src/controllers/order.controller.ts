import { Request, Response } from 'express';
const {Order} = require("../models/order.model");
import {OrderDto} from "../dtos/order.dto";
import {db} from '../index';
import {kafkaWrapper} from "../kafka-wrapper";
import {OrderCreatedProducer} from "../events/producers/order-created-producer";
import {ItemDto} from "../dtos/item.dto";


const getOrderById = (req: Request, res: Response) => {
    Order.findByID(req.query.id).then((order: OrderDto) =>
        res.status(200).json({"success": true, "message": "Data successfully queried from the database.", "data": [order]})
    ).catch((error: Error) => {
        res.status(200).json({"success": false, "message": error.message || "Unknown error occurred", "data": []})
    });
}
const getItemsByOrderId = (req: Request, res: Response) => {
    Order.findItemsByID(req.query.id).then((items: ItemDto[]) =>
        res.status(200).json({"success": true, "message": "Data successfully queried from the database.", "data": items})
    ).catch((error: Error) => {
        res.status(200).json({"success": false, "message": error.message || "Unknown error occurred", "data": []})
    });
}
const getOrders = (req: Request, res: Response) => {
    Order.get().then((rows: OrderDto[]) =>
        res.status(200).json({"success": true, "message": "Data successfully queried from the database.", "data": rows})
    ).catch((error: Error) => {
        res.status(200).json({"success": false, "message": error.message || "Unknown error occurred", "data": []})
    });
}

const createOrder = async (req: Request, res: Response) => {
    // id: string;
    // userId: string;
    // status: OrderStatus;
    // items: {
    //     id: string;
    //     name: string;
    //     price: number;
    //     quantity: number;
    // }[]
    try {
        const newOrder = await Order.create(req.body.details);
        await Order.addItems(req.body.items);
        await new OrderCreatedProducer(kafkaWrapper.producer).produce({
            id: newOrder.id,
            userId: newOrder.user_id,
            status: newOrder.status,
            items: req.body.items
        })
    } catch(error: any) {
        res.status(200).json({ "success": false, "message": error.message || "Unknown error occurred", "data": [] })
    }
}
const updateOrderByID = (req: Request, res: Response) => {
    Order.updateByID(req.body.id, req.body.details).then(async (updatedOrder: OrderDto) => {
        res.status(200).json({ "success": true, "message": "Data updated!", "data": [updatedOrder] })
    }).catch((error: Error) => {
        res.status(200).json({ "success": false, "message": error.message || "Unknown error occurred", "data": [] })
    })
}
const deleteOrderByID = (req: Request, res: Response) => {
    Order.deleteByID(req.body.id, req.body.details).then((deletedOrder: OrderDto) => {
        res.status(200).json({ "success": true, "message": "Data updated!", "data": [deletedOrder] })
    }).catch((error: Error) => {
        res.status(200).json({ "success": false, "message": error.message || "Unknown error occurred", "data": [] })
    })
}
module.exports = {
    getOrderById,
    getOrders,
    updateOrderByID,
    deleteOrderByID,
    createOrder,
    getItemsByOrderId
}