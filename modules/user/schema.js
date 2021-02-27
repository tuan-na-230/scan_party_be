const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'required name !'],
        min: 8,
        max: 255
    },
    email: {
        type: String,
        required: [true, 'required email !'],
        min: 8,
        max: 255,
        // unique: true
    },
    password: {
        type: String,
        required: [true, 'required password !'],
        min: 8,
        max: 1024
    },
    date: {
        type: Date,
        default: Date.now
    },
    enable: {
        type: Boolean,
        default: false
    }
});

module.exports = userSchema