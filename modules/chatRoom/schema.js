const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "required value"],
    default: "Sự kiện"
  },
  manager: {
    type: String,
    default: "Quản trị viên"
  },
  user: {
    type: Array,
    default: []
  },
  messages: {
    type: Array,
    default: [
      {
        user: 'Quản trị viên',
        message: 'Chào mừng các bạn đến với group chat của sự kiện',
        createdAt: Date.now
      }
    ]
  }
});

module.exports = chatSchema;
