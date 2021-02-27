const mongoose = require('mongoose');
const refreshTokenSchema = require('./schema');

const MODEL_NAME = 'REFRESH_TOKEN';
const COLLECTION_NAME = 'REFRESH_TOKEN';

const refreshTokenModel = mongoose.model(
    MODEL_NAME,
    refreshTokenSchema,
    COLLECTION_NAME
)

module.exports = refreshTokenModel;