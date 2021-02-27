const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'required content']
    }
})

module.exports = refreshTokenSchema;