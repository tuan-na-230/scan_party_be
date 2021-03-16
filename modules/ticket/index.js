const guestModel = require("./model");
const readXlsxFile = require("read-excel-file/node");
const _ = require("lodash");
const shortid = require("shortid");

const ticketHandler = {
  async createOne(req, res, next) {
    try {
      const data = {
        value: shortid.generate(),
        event: req.body.eventId,
      };
      const item = guestModel.create(data);
      item
        ? res.status(200).json({ message: "create_success" })
        : res.status(404).json({ message: "create_fail" });
    } catch (error) {
      next(error);
    }
  },

  async updateTicket(req, res, next) {
    try {
      const data = {
        value: shortid.generate(),
        event: req.body.eventId,
      };
      const item = guestModel.create(data);
      item
        ? res.status(200).json({ message: "create_success" })
        : res.status(404).json({ message: "create_fail" });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = ticketHandler;
