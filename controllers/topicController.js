const Topic = require('../models/topicModel');
const {ObjectId} = require("mongodb");
const {sendError, sendResult, getAllTopics, getCategoryById, getTopicById} = require('./baseController');

module.exports = {
    addTopic: async (req, res) => {
        console.log("addTopic");
        try {
            const topic = new Topic(req.body);
            let category = await getCategoryById(req.body.categoryId);
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
            let topic = await getTopicById(req.body.id);
            if (topic) {
                const oldTopic = {title: topic.title, description: topic.description};
                topic.title = newTopic.title ?? topic.title;
                topic.description = newTopic.description ?? topic.description;
                await topic.save();
                sendResult(res, 'Success', {
                    "id": topic._id,
                    "oldTitle": oldTopic.title,
                    "oldCategoryId": oldTopic.categoryId,
                    "oldDescription": oldTopic.description,
                    "title": topic.title,
                    "categoryId": topic.categoryId,
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
            if(!newTopic.title || !newTopic.categoryId){
                sendError(res, 400, 'Title and categoryId are required');
                return;
            }
            await Topic.replaceOne({_id: new ObjectId(req.body.id)}, newTopic);
            sendResult(res, 'Success', {
                "id": newTopic._id,
                "title": newTopic.title,
                "categoryId": newTopic.categoryId,
                "description": newTopic.description
            });
        } catch (error) {
            sendError(res, 400, 'Bad request');
        }
    },
    getTopics: async (req, res) => {
        console.log("getTopics");
        try {
            const topics = await getAllTopics();
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
            const topic = await getTopicById(req.params.id);
            let category = await getCategoryById(topic.categoryId);
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
            const topic = await getTopicById(req.params.id);
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
