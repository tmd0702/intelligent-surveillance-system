import { Request, Response } from 'express';
const {Store} = require("../models/store.model");
import {StoreDto} from "../dtos/store.dto";
import {StoreCreatedProducer} from "../events/producers/store-created-producer";
import {kafkaWrapper} from "../kafka-wrapper";

const getStoreById = (req: Request, res: Response) => {
    Store.findByID(req.query.id).then((store: StoreDto) =>
        res.status(200).json({"success": true, "message": "Data successfully queried from the database.", "data": [store]})
    ).catch((error: Error) => {
        res.status(200).json({"success": false, "message": error.message || "Unknown error occurred", "data": []})
    });
}

const getStores = (req: Request, res: Response) => {
    Store.get().then((rows: StoreDto[]) =>
        res.status(200).json({"success": true, "message": "Data successfully queried from the database.", "data": rows})
    ).catch((error: Error) => {
        res.status(200).json({"success": false, "message": error.message || "Unknown error occurred", "data": []})
    });
}

const createStore = (req: Request, res: Response) => {
    Store.create(req.body.details).then(async (createdStore: StoreDto) => {
        await new StoreCreatedProducer(kafkaWrapper.producer).produce({
            id: createdStore.id,
            name: createdStore.name,
            contactNumber: createdStore.contact_number,
            status: createdStore.status
        })
        res.status(200).json({ "success": true, "message": "Data created!", "data": [createdStore] })
    }).catch((error: Error) => {
        res.status(200).json({ "success": false, "message": error.message || "Unknown error occurred", "data": [] })
    })
}
const updateStoreByID = (req: Request, res: Response) => {
    Store.updateByID(req.body.id, req.body.details).then(async (updatedStore: StoreDto) => {
        await new StoreCreatedProducer(kafkaWrapper.producer).produce({
            id: updatedStore.id,
            name: updatedStore.name,
            contactNumber: updatedStore.contact_number,
            status: updatedStore.status
        })
        res.status(200).json({ "success": true, "message": "Data updated!", "data": [updatedStore] })
    }).catch((error: Error) => {
        res.status(200).json({ "success": false, "message": error.message || "Unknown error occurred", "data": [] })
    })
}
const deleteStoreByID = (req: Request, res: Response) => {
    Store.deleteByID(req.body.id, req.body.details).then((deletedStore: StoreDto) => {
        res.status(200).json({ "success": true, "message": "Data updated!", "data": [deletedStore] })
    }).catch((error: Error) => {
        res.status(200).json({ "success": false, "message": error.message || "Unknown error occurred", "data": [] })
    })
}
module.exports = {
    getStoreById,
    getStores,
    updateStoreByID,
    deleteStoreByID,
    createStore
}