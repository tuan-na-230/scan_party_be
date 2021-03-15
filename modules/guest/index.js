const guestModel = require("./model");
const readXlsxFile = require("read-excel-file/node");
const _ = require("lodash");

const guestHandle = {
  async uploadExcel(req, res, next) {
    if (req.body) {
      try {
        readXlsxFile(`public/uploads/excels/${req.file.filename}`).then(
          (rows) => {
            const keys = rows.shift();
            const data = rows.map((element) => _.zipObject(keys, element));
            console.log(data);
          }
        );
        return res.status(200).json({ message: "uploaded" });
      } catch (error) {}
    } else {
      res.status(401).json({ message: "required_body" });
    }
  },
};

module.exports = guestHandle;
