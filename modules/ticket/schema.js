const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  value: {
    type: String,
    required: [true, "required value"],
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  expirationDate: {
    type: Date,
    require: [true, "required effective time!"],
  },
  status: {
    type: String,
    default: "NOT_IN_USE_YET",
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EVENT",
  },
  ticketTemplate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TICKET_TEMPLATE",
  },
});

module.exports = ticketSchema;
