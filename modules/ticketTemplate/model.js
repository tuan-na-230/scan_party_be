const mongoose = require("mongoose");
const ticketTemplateSchema = require("./schema");

const MODEL_NAME = "TICKET_TEMPLATE";
const COLLECTION_NAME = "TICKET_TEMPLATE";

const ticketTemplateModel = mongoose.model(MODEL_NAME, ticketTemplateSchema, COLLECTION_NAME);

module.exports = ticketTemplateModel;
