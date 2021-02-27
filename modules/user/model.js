const mongoose = require('mongoose');
const userSchema = require('./schema');

const MODEL_NAME = 'USER';
const COLLECTION_NAME = 'USER';

const userModel = mongoose.model(
    MODEL_NAME,
    userSchema,
    COLLECTION_NAME
)

module.exports = userModel;