import { Request, Response } from 'express';
const Category = require("../models/Category-category.model.model");
import {StoreCategoryDto} from "../dtos/store-category.dto";

const getCategoryById = (req: Request, res: Response) => {
    Category.findByID(req.query.id).then((rows: StoreCategoryDto[]) =>
        res.status(200).json({"success": true, "message": "Data successfully queried from the database.", "data": rows})
    ).catch((error: Error) => {
        res.status(200).json({"success": false, "message": error.message || "Unknown error occurred", "data": []})
    });
}

const getCategories = (req: Request, res: Response) => {
    Category.get().then((rows: StoreCategoryDto[]) =>
        res.status(200).json({"success": true, "message": "Data successfully queried from the database.", "data": rows})
    ).catch((error: Error) => {
        res.status(200).json({"success": false, "message": error.message || "Unknown error occurred", "data": []})
    });
}

const createCategory = (req: Request, res: Response) => {
    Category.create(req.body.id, req.body.details).then(async (createdCategory: StoreCategoryDto) => {
        res.status(200).json({ "success": true, "message": "Data updated!", "data": [createdCategory] })
    }).catch((error: Error) => {
        res.status(200).json({ "success": false, "message": error.message || "Unknown error occurred", "data": [] })
    })
}
const updateCategoryByID = (req: Request, res: Response) => {
    Category.updateByID(req.body.id, req.body.details).then((updatedCategory: StoreCategoryDto) => {
        res.status(200).json({ "success": true, "message": "Data updated!", "data": [updatedCategory] })
    }).catch((error: Error) => {
        res.status(200).json({ "success": false, "message": error.message || "Unknown error occurred", "data": [] })
    })
}
const deleteCategoryByID = (req: Request, res: Response) => {
    Category.deleteByID(req.body.id, req.body.details).then((deletedCategory: StoreCategoryDto) => {
        res.status(200).json({ "success": true, "message": "Data updated!", "data": [deletedCategory] })
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