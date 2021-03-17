const guestModel = require("./model");
const readXlsxFile = require("read-excel-file/node");
const _ = require("lodash");
const shortid = require("shortid");

const guestHandler = {
  async uploadExcel(req, res, next) {
    if (req.body) {
      try {
        readXlsxFile(`public/uploads/excels/${req.file.filename}`).then(
          (rows) => {
            const keys = rows.shift();
            const data = rows.map((element) => _.zipObject(keys, element));
            data.forEach((ele) => {
              guestModel.create({ ...ele, dateCreated: Date.now() });
            });
          }
        );
        return res.status(200).json({ message: "uploaded" });
      } catch (error) {}
    } else {
      res.status(401).json({ message: "required_body" });
    }
  },

  async createMany(data, req, res, next) {
    try {
      data.forEach((ele) => {
        guestModel.create({ ...ele, dateCreated: Date.now() });
      });
    } catch (error) {
      next(error);
    }
  },

  async createOneByController(info, ticket, next) {
    try {
      const data = {
        info: info,
        ticket: ticket,
      };
      const item = guestModel.create(data);
    } catch (error) {
      next(error);
    }
  },

  async createOneByAPi(req, res, next) {
    try {
      const data = {
        info: req.body.info,
        ticket: req.body.ticket,
      };
      const item = await guestModel.create(data);
      item
        ? res.status(200).json({ message: "create_success" })
        : res.status(404).json({ message: "create_fail" });
    } catch (error) {
      next(error);
    }
  },

  async getMany(req, res, next) {
    try {
      const data = await guestModel.find();
      res.status(200).json({ data: data });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = guestHandler;
