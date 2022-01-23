const Question = require('../models/questionModel');
const Topic = require('../models/topicModel');
const {ObjectId} = require("mongodb");
const {sendError, sendResult, getQuestionById, getTopicById, getAllQuestions} = require('./baseController');

module.exports = {
    addQuestion: async (req, res) => {
        console.log("addQuestion");
        try {
            const question = new Question(req.body);
            const topic = await getTopicById(req.body.topicId);
            if (topic) {
                console.log(question);
                await question.save();
                sendResult(res, 'Success',
                    {
                        "id": question._id,
                        "topic": topic.title,
                        "title": question.title,
                        "answer": question.answer,
                        "description": question.description,
                    });
            } else {
                sendError(res, 400, 'Topic is missing')
            }
        } catch (error) {
            sendError(res, 400, 'Bad request')
        }
    },
    editQuestion: async (req, res) => {
        console.log("editQuestion");
        try {
            let newQuestion = new Question(req.body);
            newQuestion._id = new ObjectId(req.body.id);//will return error if id length is inappropriate
            let question = await getQuestionById(req.body.id);
            if (question) {
                if (req.body.topicId) {
                    const topic = await getTopicById(req.body.topicId);
                    if (!topic) {
                        sendError(res, 400, 'Such topic does not exist');
                        return;
                    }
                }
                const oldQuestion = {
                    "title": question.title,
                    "description": question.description,
                    "answer": question.answer,
                    "topicId": question.topicId
                };
                question.title = newQuestion.title ?? question.title;
                question.description = newQuestion.description ?? question.description;
                question.topicId = newQuestion.topicId ?? question.topicId;
                question.answer = newQuestion.answer ?? question.answer;
                console.log('result', question);
                await question.save();
                sendResult(res, 'Success', {
                    "id": question._id,
                    "oldTitle": oldQuestion.title,
                    "oldTopicId": oldQuestion.topicId,
                    "oldAnswer": oldQuestion.answer,
                    "oldDescription": oldQuestion.description,
                    "title": question.title,
                    "topicId": question.topicId,
                    "answer": question.answer,
                    "description": question.description,
                });
            } else {
                sendError(res, 400, 'Question is missing');
            }
        } catch (error) {
            sendError(res, 400, 'Bad request');
        }
    },
    replaceQuestion: async (req, res) => {
        console.log("replaceQuestion");
        try {
            let newQuestion = new Question(req.body);
            newQuestion._id = new ObjectId(req.body.id);//will return error if id length is inappropriate
            if (!newQuestion.title || !newQuestion.answer || !newQuestion.topicId) {
                sendError(res, 400, 'Title, answer and topicId are required');
                return;
            }
            const newTopic = await getTopicById(req.body.topicId);
            console.log('newTopic', newTopic);
            if (!newTopic) {
                sendError(res, 400, 'New topic does not exist');
                return;
            }
            await Question.replaceOne({_id: new ObjectId(req.body.id)}, newQuestion);
            sendResult(res, 'Success', {
                "id": newQuestion._id,
                "title": newQuestion.title,
                "topic": newTopic.title,
                "answer": newQuestion.answer,
                "description": newQuestion.description
            });
        } catch (error) {
            sendError(res, 400, 'Bad request');
        }
    },
    getQuestions: async (req, res) => {
        console.log("getQuestions");
        try {
            const questions = await getAllQuestions();
            console.log(questions);
            if (questions.length) {
                sendResult(res, 'Success', questions.map((question) => {
                    return {
                        "id": question._id,
                        "topicId": question.topicId,
                        "title": question.title,
                        "answer": question.answer,
                        "description": question.description,
                    }
                }));
            } else {
                sendError(res, 400, 'Questions are missing')
            }
        } catch (error) {
            sendError(res, 400, 'Bad request')
        }
    },
    getQuestion: async (req, res) => {
        console.log("getQuestion");
        try {
            const question = await getQuestionById(req.params.id);
            let topic = await getTopicById(question.topicId);
            if (question) {
                sendResult(res, 'Success', {
                    "id": question._id,
                    "topic": topic.title,
                    "title": question.title,
                    "answer": question.answer,
                    "description": question.description,
                });
            } else {
                sendError(res, 400, 'Question is missing')
            }
        } catch (error) {
            sendError(res, 400, 'Bad request')
        }
    },
    deleteQuestion: async (req, res) => {
        console.log("deleteQuestion");
        try {
            const question = await getQuestionById(req.params.id);
            if (question) {
                await question.remove();
                sendResult(res, 'Success', {
                    "id": question._id,
                    "topicId": question.topicId,
                    "title": question.title,
                    "answer": question.answer,
                    "description": question.description,
                });
            } else {
                sendError(res, 400, 'Question is missing')
            }
        } catch (error) {
            sendError(res, 400, 'Bad request')
        }
    },
}
