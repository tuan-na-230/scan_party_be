const express = require("express");
const multer = require("multer");
const eventHandle = require("../modules/event");
const eventRouter = new express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/excel");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

eventRouter.get("/", eventHandle.getManyEvent);

eventRouter.post("/", eventHandle.createEvent);

eventRouter.post("/full-event", eventHandle.createFullEvent);

eventRouter.get('/:eventId', eventHandle.getDetailEvent)

module.exports = eventRouter;
