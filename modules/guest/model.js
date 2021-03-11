const mongoose = require('mongoose');
const guestSchema = require('./schema');

const MODEL_NAME = 'GUEST';
const COLLECTION_NAME = 'GUEST';

const guestModel = mongoose.model(
    MODEL_NAME,
    guestSchema,
    COLLECTION_NAME
)

module.exports = guestModel;