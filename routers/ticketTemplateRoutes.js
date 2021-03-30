const express = require("express");
const ticketTemplateHandler = require("../modules/ticketTemplate");

const ticketTemplateRouter = new express.Router();

ticketTemplateRouter.get("/", ticketTemplateHandler.findMany);

ticketTemplateRouter.post("/", ticketTemplateHandler.create);

module.exports = ticketTemplateRouter;
