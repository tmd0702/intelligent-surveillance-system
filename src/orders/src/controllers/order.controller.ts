import { Request, Response } from 'express';
const {Order} = require("../models/order.model");
import {OrderDto} from "../dtos/order.dto";
import {db} from '../index';
import {kafkaWrapper} from "../kafka-wrapper";
import {OrderCreatedProducer} from "../events/producers/order-created-producer";
import {OrderUpdatedProducer} from "../events/producers/order-updated-producer";
import {ItemDto} from "../dtos/item.dto";
import {OrderStatus} from "@softzone/common";
import {OrderItemDto} from "../dtos/order-item.dto";


const getOrderById = (req: Request, res: Response) => {
    Order.findByID(req.query.id).then((order: OrderDto) =>
        res.status(200).json({"success": true, "message": "Data successfully queried from the database.", "data": [order]})
    ).catch((error: Error) => {
        res.status(200).json({"success": false, "message": error.message || "Unknown error occurred", "data": []})
    });
}
const getItemsByOrderId = (req: Request, res: Response) => {
    Order.findItemsByID(req.query.order_id).then((items: ItemDto[]) =>
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
        const orderItems = req.body.details.items;
        delete req['body']['details']['items'];
        const newOrder = await Order.create(req.body.details);
        const addItemsPromise = orderItems.map(async (item: OrderItemDto) => {
            item['order_id'] = newOrder.id;
            await Order.addItems(item);
        })
        await Promise.all(addItemsPromise);
        await new OrderCreatedProducer(kafkaWrapper.producer).produce({
            id: newOrder.id,
            user_id: newOrder.user_id,
            status: newOrder.status,
            total_amount: newOrder.total_amount,
            store_id: newOrder.store_id
        })
        res.status(200).json({ "success": true, "message": "Data created!", "data": [newOrder] })
    } catch(error: any) {
        res.status(200).json({ "success": false, "message": error.message || "Unknown error occurred", "data": [] })
    }
}
const updateOrderByID = (req: Request, res: Response) => {
    Order.updateByID(req.body.id, req.body.details).then(async (updatedOrder: OrderDto) => {
        console.log('start sending')
        await new OrderUpdatedProducer(kafkaWrapper.producer).produce({
            id: updatedOrder.id,
            user_id: updatedOrder.user_id,
            status: updatedOrder.status,
            total_amount: updatedOrder.total_amount,
            store_id: updatedOrder.store_id
        })
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