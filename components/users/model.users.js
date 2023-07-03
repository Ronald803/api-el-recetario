const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchena = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        required: true
    },
    favorites:{
        type: Array,
        required: true
    },
    recommended: {
        type: Array,
        required: true
    }
})

const model = mongoose.model('User',mySchena);
module.exports = model;
