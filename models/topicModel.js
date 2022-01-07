const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

const Topic = mongoose.model('topics', TopicSchema);
module.exports = Topic;
