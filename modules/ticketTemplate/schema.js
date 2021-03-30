const mongoose = require("mongoose");

const ticketTemplateSchema = new mongoose.Schema({
  backgroundUrl: {
    type: String,
    required: [true, 'required_background']
  }
});

module.exports = ticketTemplateSchema;
