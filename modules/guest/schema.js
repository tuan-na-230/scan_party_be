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
});

module.exports = guestSchema;
