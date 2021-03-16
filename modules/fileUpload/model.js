const mongoose = require('mongoose');
const fileUploadSchema = require('./schema');

const MODEL_NAME = 'FILE_UPLOAD';
const COLLECTION_NAME = 'FILE_UPLOAD';

const fileUploadModel = mongoose.model(
    MODEL_NAME,
    fileUploadSchema,
    COLLECTION_NAME
)

module.exports = fileUploadModel;