const fileUploadModel = require("./model");

const fileUploadHandler = {
  async uploadExcel(req, res, next) {
    if (req.file) {
      const data = {
        name: req.file.filename,
        path: `uploads/excels/${req.file.filename}`,
        user: req.body.email,
      };
      const item = await fileUploadModel.create(data);
      res.status(200).json({ message: "upload_success" });
    } else {
      res.status(404).json({ message: "required_file" });
    }
  },

  async uploadNewAvatar(req, res, next) {
    if (req.file) {
      const data = {
        name: req.file.filename,
        path: `uploads/images/${req.file.filename}`,
        user: req.body.email,
      };
      const item = await fileUploadModel.create(data);
      res.status(200).json({ message: "upload_success" });
    } else {
      res.status(404).json({ message: "required_file" });
    }
  },
};

module.exports = fileUploadHandler;
