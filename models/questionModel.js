const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    topicId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
});

const Question = mongoose.model('questions', QuestionSchema);
module.exports = Question;
