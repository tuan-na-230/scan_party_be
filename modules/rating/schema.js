const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  ratingList: {
      type: Array,
      default: []
  }
});

module.exports = ratingSchema;
