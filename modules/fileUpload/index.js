const readXlsxFile = require("read-excel-file/node");
const _ = require("lodash");
const fileUploadModel = require("./model");

const guestHandle = {
    async uploadExcel(req, res, next) {
        if (req.file) {
            const data = {
                name: req.file.filename,
                path: `uploads/${req.file.filename}`,
                user: 'qw'
            }
            const item = await fileUploadModel.create(data)
            res.status(200).json({ message: "upload_success" });
        } else {
            res.status(401).json({ message: "required_file" });
        }
    },


};

module.exports = guestHandle;
