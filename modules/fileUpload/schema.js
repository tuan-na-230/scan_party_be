const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    name: {
        type: Object,
        require: [true, 'required name']
    },
    path: {
        type: string,
        require: [true, 'required path']
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