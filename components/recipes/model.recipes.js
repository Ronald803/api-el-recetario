const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    punctuation:{
        type: Number,
        required: true
    },
    favorite:{
        type: Boolean,
        required: true
    },
    time:{
        type: Number,
        required: true
    },
    difficulty:{
        type: Number,
        required: true
    },
    recommended:{
        type: Boolean,
        required: true
    },
    category:{
        type: Array,
        required: true
    },
    ingredients:{
        type: Array,
        required: true
    },
    process:{
        type: Array,
        required: true
    },
    autor: {
        type: String,
        required: true
    }
})

const model     = mongoose.model('Recipe',mySchema);
module.exports  = model;
