import { Request, Response } from 'express';
const {Item} = require("../models/item.model");
import {ItemDto} from "../dtos/item.dto";
import {kafkaWrapper} from "../kafka-wrapper";
import {ItemCreatedProducer} from "../events/producers/item-created-producer";
import {ItemUpdatedProducer} from "../events/producers/item-updated-producer";

const getItemById = (req: Request, res: Response) => {
    Item.findByID(req.query.id).then((rows: ItemDto[]) =>
        res.status(200).json({"success": true, "message": "Data successfully queried from the database.", "data": rows})
    ).catch((error: Error) => {
        res.status(200).json({"success": false, "message": error.message || "Unknown error occurred", "data": []})
    });
}

const getItems = (req: Request, res: Response) => {
    Item.get().then((rows: ItemDto[]) =>
        res.status(200).json({"success": true, "message": "Data successfully queried from the database.", "data": rows})
    ).catch((error: Error) => {
        res.status(200).json({"success": false, "message": error.message || "Unknown error occurred", "data": []})
    });
}

const createItem = (req: Request, res: Response) => {
    console.log(req.body)
    Item.create(req.body.details).then(async (createdItem: ItemDto) => {
        await new ItemCreatedProducer(kafkaWrapper.producer).produce({
            id: createdItem.id,
            name: createdItem.name,
            price: createdItem.price,
            stock: createdItem.stock,
            sale_price: createdItem.sale_price,
            image: createdItem.image
        })
        res.status(200).json({ "success": true, "message": "Data created!", "data": [createdItem] })
    }).catch((error: Error) => {
        console.log(error);
        res.status(200).json({ "success": false, "message": error.message || "Unknown error occurred", "data": [] })
    })
}
const updateItemByID = (req: Request, res: Response) => {
    Item.updateByID(req.body.id, req.body.details).then(async (updatedItem: ItemDto) => {
        await new ItemUpdatedProducer(kafkaWrapper.producer).produce({
            id: updatedItem.id,
            name: updatedItem.name,
            price: updatedItem.price,
            stock: updatedItem.stock,
            sale_price: updatedItem.sale_price,
            image: updatedItem.image
        })
        res.status(200).json({ "success": true, "message": "Data updated!", "data": [updatedItem] })
    }).catch((error: Error) => {
        res.status(200).json({ "success": false, "message": error.message || "Unknown error occurred", "data": [] })
    })
}
const deleteItemByID = (req: Request, res: Response) => {
    Item.deleteByID(req.body.id, req.body.details).then((deletedItem: ItemDto) => {
        res.status(200).json({ "success": true, "message": "Data updated!", "data": [deletedItem] })
    }).catch((error: Error) => {
        res.status(200).json({ "success": false, "message": error.message || "Unknown error occurred", "data": [] })
    })
}
module.exports = {
    getItemById,
    getItems,
    updateItemByID,
    deleteItemByID,
    createItem
}