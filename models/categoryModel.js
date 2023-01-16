const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Topic = require('../models/topicModel');

const CategorySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    imageId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },

});

/*CategorySchema.post('save', (doc) => {
    console.log('save');
    console.log('doc', doc);
});*/

CategorySchema.post('remove', async (doc) => {
    console.log('CategorySchema post remove');
    try {
        const topics = await Topic.find({'categoryId': doc._id});
        if(topics.length){
            topics.forEach(async (topic)=> await topic.remove());
        }
    }catch (e) {
        console.log('Topics are absent');
    }
});


const Category = mongoose.model('categories', CategorySchema);
module.exports = Category;
