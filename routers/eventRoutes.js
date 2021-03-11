const express = require('express');
const eventHandle = require('../modules/event');
const eventRouter = new express.Router();

eventRouter.get('/', eventHandle.getManyEvent);

eventRouter.post('/', eventHandle.createEvent);

module.exports = eventRouter;