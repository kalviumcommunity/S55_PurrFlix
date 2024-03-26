const mongoose = require('mongoose');

const CatSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    videourl: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    }
});

const Entity = mongoose.model('purrflixsite-collections', CatSchema);

module.exports = { Entity }; 