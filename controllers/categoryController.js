const Category = require('../models/categoryModel');
const {ObjectId} = require("mongodb");
const {sendError, sendResult} = require('./baseController');

module.exports = {
    addCategory: async (req, res) => {
        console.log("addCategory");
        try {
            const category = new Category(req.body);
            console.log(category);
            await category.save();
            sendResult(res, 'Success',
                {
                    "id": category._id,
                    "title": category.title,
                    "description": category.description,
                });
        } catch (error) {
            sendError(res, 400, 'Bad request')
        }
    },
    editCategory: async (req, res) => {
        console.log("editCategory");
        try {
            let newCategory = new Category(req.body);
            newCategory._id = new ObjectId(req.body.id);
            console.log('category', newCategory);
            let category = await Category.findOne({_id: new ObjectId(req.body.id)});
            if (category) {
                const oldCategory = {title: category.title, description: category.description};
                category.title = newCategory.title ?? category.title;
                category.description = newCategory.title ?? category.description;
                console.log('result', category);
                await category.save();
                sendResult(res, 'Success', {
                    "id": category._id,
                    "oldTitle": oldCategory.title,
                    "oldDescription": oldCategory.description,
                    "title": category.title,
                    "description": category.description,
                });
            } else {
                sendError(res, 400, 'Category is missing')
            }
        } catch (error) {
            sendError(res, 400, 'Bad request')
        }
    },
    replaceCategory: async (req, res) => {
        console.log("replaceCategory");
        try {
            let newCategory = new Category(req.body);
            newCategory._id = new ObjectId(req.body.id);
            if(!newCategory.title){
                console.log('Error');
                sendError(res, 400, 'Title is required');
                return;
            }
            await Category.replaceOne({_id: new ObjectId(req.body.id)}, newCategory);
            sendResult(res, 'Success', {
                "id": newCategory._id,
                "title": newCategory.title,
                "description": newCategory.description
            });
        } catch (error) {
            sendError(res, 400, 'Bad request');
        }
    },
    getCategories: async (req, res) => {
        console.log("getCategories");
        try {
            const categories = await Category.find({});
            console.log(categories);
            if (categories.length) {
                sendResult(res, 'Success', categories.map((category) => {
                    return {
                        "id": category._id,
                        "title": category.title,
                        "description": category.description,
                    }
                }));
            } else {
                sendError(res, 400, 'Categories are missing')
            }
        } catch (error) {
            sendError(res, 400, 'Bad request')
        }
    },
    getCategory: async (req, res) => {
        console.log("getCategory");
        try {
            const category = await Category.findOne({_id: new ObjectId(req.params.id)});
            if (category) {
                sendResult(res, 'Success', {
                    "id": category._id,
                    "title": category.title,
                    "description": category.description,
                });
            } else {
                sendError(res, 400, 'Category is missing')
            }
        } catch (error) {
            sendError(res, 400, 'Bad request')
        }
    },
    deleteCategory: async (req, res) => {
        console.log("deleteCategory");
        try {
            const category = await Category.findOne({_id: new ObjectId(req.params.id)});
            if (category) {
                await Category.deleteOne(category);
                sendResult(res, 'Success', {
                    "id": category._id,
                    "title": category.title,
                    "description": category.description,
                });
            } else {
                sendError(res, 400, 'Category is missing')
            }
        } catch (error) {
            sendError(res, 400, 'Bad request')
        }
    },
}
