const mongoose = require("mongoose");

const guestSchema = new mongoose.Schema({
  info: {
    type: Object,
    required: [true, "required info"],
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  ticket: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TICKET",
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EVENT",
  }
});

module.exports = guestSchema;
