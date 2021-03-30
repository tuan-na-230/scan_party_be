const express = require("express");
const eventHandle = require("../modules/event");
const guestHandle = require("../modules/guest");
const ticketHandler = require("../modules/ticket");
const ticketRouter = new express.Router();

ticketRouter.post("/", ticketHandler.createOne);

ticketRouter.post("/scan", ticketHandler.scanTicket);

ticketRouter.get("/:eventId", ticketHandler.findManyByEvent)

module.exports = ticketRouter;
