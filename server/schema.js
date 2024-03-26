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
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    img:{ 
        type: String
    },
    created_by:{
        type: String,
        required: true  
    } 
});

const Entity = mongoose.model('purrflixSite-collections', CatSchema);

module.exports = { Entity }; 