const Question = require('../models/questionModel');
const Topic = require('../models/topicModel');
const Category = require('../models/categoryModel');
const {ObjectId} = require("mongodb");

module.exports = {
    sendError(res, status, message) {
        res.status(status).send({
            message: message
        });
    },

    sendResult(res, message, result) {
        res.send({
            message: message,
            result: Array.isArray(result)?[...result]:result
        });
    },

    async getQuestionById(id) {
        const question = await Question.findOne({_id: new ObjectId(id)},'-__v');
        return question ?? false;
    },

    async getTopicById(id) {
        const topic = await Topic.findOne({_id: new ObjectId(id)},'-__v');
        return topic ?? false;
    },

    async getCategoryById(id) {
        const category = await Category.findOne({_id: new ObjectId(id)},'-__v');
        return category ?? false;
    },

    async getAllQuestions() {
        const questions = await Question.find({},'-__v');
        return questions ?? false;
    },

    async getAllTopics() {
        const topics = await Topic.find({},'-__v');
        return topics ?? false;
    },

    async getAllCategories() {
        const categories = await Category.find({},'-__v');
        return categories ?? false;
    },

    async getTopicsByCategoryId(categoryId) {
        const topics = await Topic.find({'categoryId':categoryId},'-__v');
        return topics;
    },
}
