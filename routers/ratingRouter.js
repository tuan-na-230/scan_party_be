const express = require("express");
const ratingHandler = require("../modules/rating");
const ratingRouter = new express.Router();

ratingRouter.post("/:evenId/rating", ratingHandler.UpdateRating);

module.exports = ratingRouter;
