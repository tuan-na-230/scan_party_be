const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'required first name !'],
        max: 255
    },
    lastName: {
        type: String,
        required: [true, 'required last name !'],
        max: 255
    },
    email: {
        type: String,
        required: [true, 'required email !'],
        min: 8,
        max: 255,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'required password !'],
        min: 8,
        max: 1024
    },
    emailMarketing: {
        type: Boolean
    },
    date: {
        type: Date,
        default: Date.now
    },
    phoneNumber: {
        type: String,
    },
    company: {
        type: String,
    },
    facebookAddress: {
        type: String
    },
    avatar: {
        type: String
    },
    enable: {
        type: Boolean,
        default: false
    }
});

module.exports = userSchema