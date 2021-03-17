const express = require("express");
const multer = require("multer");
const eventHandle = require("../modules/event");
const guestHandle = require("../modules/guest");
const ticketHandler = require("../modules/ticket");
const guestRouter = new express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/excels");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

//upload excel file guest
guestRouter.post(
  "/upload-excel",
  upload.single("file"),
  guestHandle.uploadExcel
);

guestRouter.post("/", guestHandle.createOneByAPi);

guestRouter.get("/", guestHandle.getMany);

module.exports = guestRouter;
