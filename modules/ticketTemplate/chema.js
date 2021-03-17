const mongoose = require("mongoose");

const ticketTemplateSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, "required_type"],
  },
  header: {
    type: String,
    required: [true, "required_header"],
  },
  content: {},
  footer: {
    type: String,
    required: [true, "required_footer"],
  },
});

module.exports = ticketTemplateSchema;
