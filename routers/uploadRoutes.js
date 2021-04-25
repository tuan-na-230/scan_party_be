const express = require("express");
const multer = require("multer");
const authService = require("../authService");
const fileUploadHandler = require("../modules/fileUpload");
const fileUploadRouter = new express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/uploads/excels");
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

fileUploadRouter.get("/excel/:id", fileUploadHandler.getListFileExcel);

fileUploadRouter.get("/image/:id", fileUploadHandler.getListFileImage);

fileUploadRouter.post("/excel", upload.single("file"), fileUploadHandler.uploadExcel);

module.exports = fileUploadRouter;
