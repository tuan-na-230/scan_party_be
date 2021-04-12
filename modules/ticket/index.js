const guestModel = require("../guest/model");
const readXlsxFile = require("read-excel-file/node");
const _ = require("lodash");
const shortid = require("shortid");
const ticketModel = require("./model");
const helper = require("../../helper");
const chatModel = require("../chatRoom/model");
const eventModel = require("../event/model");

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
            ? res.status(200).json({ data: { ...guestInfo._doc, expirationDate: item.expirationDate } })
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

  async findManyByEvent(req, res, next) {
    try {
      let { page = 1, size = 10, sort = "asc", sortBy = "name" } = req.query;
      const eventId = req.params.eventId;
      page = parseInt(page);
      size = parseInt(size);

      const skip = page * size;
      const limit = size;
      const data = await ticketModel
        .find({ event: eventId })
        .skip(skip)
        .limit(limit);
      const count = await ticketModel.find({ event: eventId }).count();
      data
        ? res.status(200).json({
          content: data,
          pagination: { page: page, size: size, total: count },
        })
        : res.status(404).json({ message: "guest_info_not_found" });
    } catch (error) {
      next(error);
    }
  },

  async getCountTicket(req, res, next) {
    try {
      const { eventId } = req.params;
      const countTicket = await ticketModel.find({ event: eventId }).count();
      const event = await eventModel.findById(eventId)
      const chat = await chatModel.findById(event.chat);
      if (countTicket) {
        res.status(200).json({ countTicket, countMessage: chat.messages.length })
      }
    } catch (error) {
      next(error);
    }
  },
};

module.exports = ticketHandler;
