const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Question = require('../models/questionModel');

const TopicSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    categoryId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
});

TopicSchema.post('remove', async (doc) => {
    console.log('TopicSchema post remove');
    try {
        const result = await Question.remove({'topicId': doc._id});
        console.log(result);
    }catch (e) {
        console.log('Questions are absent');
    }
});

const Topic = mongoose.model('topics', TopicSchema);
module.exports = Topic;
