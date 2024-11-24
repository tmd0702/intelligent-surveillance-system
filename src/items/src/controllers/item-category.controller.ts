import { Request, Response } from 'express';
import {ItemCategoryDto} from "../dtos/item-category.dto";
const {Category} = require("../models/item-category.model");

const getCategoryById = (req: Request, res: Response) => {
    Category.findByID(req.query.id).then((rows: ItemCategoryDto[]) =>
        res.status(200).json({"success": true, "message": "Data successfully queried from the database.", "data": rows})
    ).catch((error: Error) => {
        res.status(200).json({"success": false, "message": error.message || "Unknown error occurred", "data": []})
    });
}

const getCategories = (req: Request, res: Response) => {
    Category.get().then((rows: ItemCategoryDto[]) =>
        res.status(200).json({"success": true, "message": "Data successfully queried from the database.", "data": rows})
    ).catch((error: Error) => {
        res.status(200).json({"success": false, "message": error.message || "Unknown error occurred", "data": []})
    });
}

const createCategory = (req: Request, res: Response) => {
    Category.create(req.body.details).then(async (createdCategory: ItemCategoryDto) => {
        res.status(200).json({ "success": true, "message": "Data created!", "data": [createdCategory] })
    }).catch((error: Error) => {
        res.status(200).json({ "success": false, "message": error.message || "Unknown error occurred", "data": [] })
    })
}
const updateCategoryByID = (req: Request, res: Response) => {
    Category.updateByID(req.body.id, req.body.details).then(async (updatedItem: ItemCategoryDto) => {
        res.status(200).json({ "success": true, "message": "Data updated!", "data": [updatedItem] })
    }).catch((error: Error) => {
        res.status(200).json({ "success": false, "message": error.message || "Unknown error occurred", "data": [] })
    })
}
const deleteCategoryByID = (req: Request, res: Response) => {
    Category.deleteByID(req.body.id, req.body.details).then((deletedItem: ItemCategoryDto) => {
        res.status(200).json({ "success": true, "message": "Data updated!", "data": [deletedItem] })
    }).catch((error: Error) => {
        res.status(200).json({ "success": false, "message": error.message || "Unknown error occurred", "data": [] })
    })
}
module.exports = {
    getCategoryById,
    getCategories,
    updateCategoryByID,
    deleteCategoryByID,
    createCategory
}