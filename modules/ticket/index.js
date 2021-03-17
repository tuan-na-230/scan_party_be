const guestModel = require("../guest/model");
const readXlsxFile = require("read-excel-file/node");
const _ = require("lodash");
const shortid = require("shortid");
const ticketModel = require("./model");
const helper = require("../../helper");

const ticketHandler = {
  async createOne(req, res, next) {
    try {
      const data = {
        value: shortid.generate(),
        event: req.body.eventId,
        expirationDate: helper.addDays(Date.now(), req.body.effectiveDate),
      };
      console.log(data);
      const item = await guestModel.create(data);
      item
        ? res.status(200).json({ message: "create_success" })
        : res.status(404).json({ message: "create_fail" });
    } catch (error) {
      next(error);
    }
  },

  async createOneController(eventId, effectiveDate, next) {
    try {
      const data = {
        value: shortid.generate(),
        event: eventId,
        expirationDate: helper.addDays(Date.now(), effectiveDate),
      };
      const item = await ticketModel.create(data);
      return item;
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

  async scanTicket(req, res, next) {
    try {
      const data = {
        value: req.body.value,
      };
      const item = await ticketModel.findOne(data).populate("event");
      if (item && item.event) {
        if (item.event._id == req.body.eventId) {
          const guestInfo = await guestModel.findOne({ ticket: item._id });

          guestInfo
            ? res.status(200).json({ data: guestInfo })
            : res.status(404).json({ message: "guest_info_not_found" });
        } else {
          res.status(200).json({ message: "reject_ticket" });
        }
      } else {
        return res.status(404).json({ message: "ticket_not_found" });
      }
    } catch (error) {
      next(error);
    }
  },
};

module.exports = ticketHandler;
