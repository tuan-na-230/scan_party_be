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
  effectiveTime: {
    type: Date,
    require: [true, "required effective time!"],
  },
  status: {
    type: String,
    default: "NOT_USE",
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EVENT",
  },
});

module.exports = ticketSchema;
