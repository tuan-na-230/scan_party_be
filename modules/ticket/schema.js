const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    dateCreated: {
        type: Date,
        default: Date.now
    },
    effectiveTime: {
        type: Date,
        require: [true, 'required effective time!']
    },
    status: {
        type: String,
        default: 'wait'
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EVENT'
    }
});

module.exports = ticketSchema