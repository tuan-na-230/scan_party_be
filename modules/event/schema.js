const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'required name event !'],
        max: 255
    },
    address: {
        type: String,
        required: [true, 'required address event']
    },
    company: {
        type: String,
        required: [true, 'required company name']
    },
    description: {
        type: String,
    },
    time: {
        date: {
            type: Date,
            required: [true, 'required date event']
        },
        beginTime: {
            type: Date,
            required: [true, 'required begin time event']
        },
        endTime: {
            type: Date,
            required: [true, 'required end time event']
        }
    },
    manager: {
        name: {
            type: String,
            required: [true, 'required name manager event']
        },
        phoneNumber: {
            type: String,
        },
        facebook: {
            type: String,
        },
        email: {
            type: String,
            required: [true, 'required email manager event']
        },
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CHAT",
    },

});

module.exports = EventSchema