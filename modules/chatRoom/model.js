const mongoose = require("mongoose");
const chatSchema = require("./schema");

const MODEL_NAME = "v";
const COLLECTION_NAME = "CHAT";

const chatModel = mongoose.model(MODEL_NAME, chatSchema, COLLECTION_NAME);

module.exports = chatModel;
