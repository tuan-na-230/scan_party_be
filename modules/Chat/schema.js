const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "required value"],
  },
  manager: {
    type: String,
  },
  user: {
    type: Array
  },
  messages: {
    type: Array,
    default: [
      {
        user: 'Quản trị viên',
        message: 'Chào mừng các bạn đến với group của sự kiện',
        createdAt: Date.now
      }
    ]
  }
});

module.exports = chatSchema;
