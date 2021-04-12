const express = require("express");
const chatRoomHandler = require("../modules/chatRoom");
const chatRoomRouter = new express.Router();

// chatRoomRouter.get("/:eventId", chatRoomHandler.updateListMessage)

module.exports = chatRoomRouter;
