const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    name: {
        type: Object,
        required: [true, 'required name']
    },
    type: {
        type: String,
        required: [true, 'required type file']
    },
    path: {
        type: String,
        required: [true, 'required path']
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'USER'
    }
});

module.exports = fileSchema