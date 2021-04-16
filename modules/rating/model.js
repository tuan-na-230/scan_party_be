const mongoose = require("mongoose");
const ratingSchema = require("./schema");

const MODEL_NAME = "RATING";
const COLLECTION_NAME = "RATING";

const ratingModel = mongoose.model(MODEL_NAME, ratingSchema, COLLECTION_NAME);

module.exports = ratingModel;
