const mongoose = require("mongoose");
const ticketSchema = require("./schema");

const MODEL_NAME = "TICKET";
const COLLECTION_NAME = "TICKET";

const ticketModel = mongoose.model(MODEL_NAME, ticketSchema, COLLECTION_NAME);

module.exports = ticketModel;
