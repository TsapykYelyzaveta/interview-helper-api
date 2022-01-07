const Topic = require('../models/topicModel');
const Category = require('../models/categoryModel');
const {ObjectId} = require("mongodb");
const {sendError, sendResult} = require('./baseController');

module.exports = {
    addTopic: async (req, res) => {
        console.log("addTopic");
        try {
            const topic = new Topic(req.body);
            let category = await Category.findOne({_id: new ObjectId(req.body.categoryId)});
            if(category){
                console.log(topic);
                await topic.save();
                sendResult(res, 'Success',
                    {
                        "id": topic._id,
                        "category": category.title,
                        "title": topic.title,
                        "description": topic.description,
                    });
            }else{
                sendError(res, 400, 'Category is missing')
            }
        } catch (error) {
            sendError(res, 400, 'Bad request')
        }
    },
    editTopic: async (req, res) => {
        console.log("editTopic");
        try {
            let newTopic = new Topic(req.body);
            newTopic._id = new ObjectId(req.body.id);
            console.log('topic', newTopic);
            let topic = await Topic.findOne({_id: new ObjectId(req.body.id)});
            if (topic) {
                const oldTopic = {title: topic.title, description: topic.description};
                topic.title = newTopic.title ?? topic.title;
                topic.description = newTopic.description ?? topic.description;
                console.log('result', topic);
                await topic.save();
                sendResult(res, 'Success', {
                    "id": topic._id,
                    "oldTitle": oldTopic.title,
                    "oldDescription": oldTopic.description,
                    "title": topic.title,
                    "description": topic.description,
                });
            } else {
                sendError(res, 400, 'Topic is missing')
            }
        } catch (error) {
            sendError(res, 400, 'Bad request')
        }
    },
    replaceTopic: async (req, res) => {
        console.log("replaceTopic");
        try {
            let newTopic = new Topic(req.body);
            newTopic._id = new ObjectId(req.body.id);
            if(!newTopic.title){
                console.log('Error');
                sendError(res, 400, 'Title is required');
                return;
            }
            await Topic.replaceOne({_id: new ObjectId(req.body.id)}, newTopic);
            sendResult(res, 'Success', {
                "id": newTopic._id,
                "title": newTopic.title,
                "description": newTopic.description
            });
        } catch (error) {
            sendError(res, 400, 'Bad request');
        }
    },
    getTopics: async (req, res) => {
        console.log("getTopics");
        try {
            const topics = await Topic.find({});
            console.log(topics);
            if (topics.length) {
                sendResult(res, 'Success', topics.map((topic) => {
                    return {
                        "id": topic._id,
                        "categoryId": topic.categoryId,
                        "title": topic.title,
                        "description": topic.description,
                    }
                }));
            } else {
                sendError(res, 400, 'Topics are missing')
            }
        } catch (error) {
            sendError(res, 400, 'Bad request')
        }
    },
    getTopic: async (req, res) => {
        console.log("getTopic");
        try {
            const topic = await Topic.findOne({_id: new ObjectId(req.params.id)});
            let category = await Category.findOne({_id: new ObjectId(topic.categoryId)});
            if (topic) {
                sendResult(res, 'Success', {
                    "id": topic._id,
                    "category": category.title,
                    "title": topic.title,
                    "description": topic.description,
                });
            } else {
                sendError(res, 400, 'Topic is missing')
            }
        } catch (error) {
            sendError(res, 400, 'Bad request')
        }
    },
    deleteTopic: async (req, res) => {
        console.log("deleteTopic");
        try {
            const topic = await Topic.findOne({_id: new ObjectId(req.params.id)});
            if (topic) {
                await Topic.deleteOne(topic);
                /////Delete topics and questions/////
                sendResult(res, 'Success', {
                    "id": topic._id,
                    "categoryId": topic.categoryId,
                    "title": topic.title,
                    "description": topic.description,
                });
            } else {
                sendError(res, 400, 'Topic is missing')
            }
        } catch (error) {
            sendError(res, 400, 'Bad request')
        }
    },
}
