const mongoose = require('mongoose');
const eventSchema = require('./schema');

const MODEL_NAME = 'EVENT';
const COLLECTION_NAME = 'EVENT';

const eventModel = mongoose.model(
    MODEL_NAME,
    eventSchema,
    COLLECTION_NAME
)

module.exports = eventModel;