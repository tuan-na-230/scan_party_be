const emailHandler = require("../../email_helper");
const guestHandler = require("../guest");
const ticketHandler = require("../ticket");
const eventModel = require("./model");
const moment = require("moment");

const QRCode = require("qrcode");
const { MongooseDocument } = require("mongoose");

const eventHandle = {
  async getManyEvent(req, res, next) {
    if (req.body) {
      try {
        const item = await eventModel.find();
        res.status(200).json(item);
      } catch (error) {
        next(error);
      }
    } else {
      res.status(401).json({ message: "required_body" });
    }
  },

  async getDetailEvent(req, res, next) {
    if (req.body) {
      try {
        const eventId = req.params.eventId;
        const item = await eventModel.findOne({ _id: eventId });
        res.status(200).json(item);
      } catch (error) {
        next(error);
      }
    } else {
      res.status(401).json({ message: "required_body" });
    }
  },

  async createEvent(req, res, next) {
    if (req.body) {
      try {
        const item = await eventModel.create(req.body);
        item && res.status(200).json({ message: "create_successfully" });
      } catch (error) {
        next(error);
      }
    } else {
      res.status(401).json({ message: "required_body" });
    }
  },

  async createFullEvent(req, res, next) {
    if (req.body) {
      try {
        const { eventInfo, guestInfo, ticketTemplateInfo } = req.body;
        const item = await eventModel.create(eventInfo);
        guestInfo.forEach(async (ele, index) => {
          const ticket = await ticketHandler.createOneController(
            item._id,
            ticketTemplateInfo.effectiveDate || 14,
            next
          );
          const guest = await guestHandler.createOneByController(
            guestInfo[index],
            ticket._id,
            next
          );
          let qrCode = await QRCode.toDataURL(ticket.value)
            .then((url) => {
              return url;
            })
            .catch((err) => {
              res.status(404).json({ message: err });
            });
          const dataSendTicket = {
            email: "tuan.na.230@gmail.com",
            qrcode: qrCode,
            nameEvent: eventInfo.name,
            addressEvent: eventInfo.address,
            dateEvent: moment(eventInfo.time.date).format("DD-MM-YYYY"),
            beginTimeEvent: moment(eventInfo.time.beginTime).format("HH:mm"),
            endTimeEvent: moment(eventInfo.time.endTime).format("HH:mm"),
            nameGuest: "Nguyễn Anh Tuấn",
          };
          emailHandler.sendTicket(dataSendTicket);
          res.status(200).json({ message: "create_success" });
        });
      } catch (error) {
        next(error);
      }
    } else {
      res.status(401).json({ message: "required_body" });
    }
  },

  async delEvent(req, res, next) {
    try {
      const { eventId } = req.params;
      console.log(eventId);
      const item = await eventModel.findOneAndDelete({ eventId });
      item && res.status(200).json({ message: "delete_event_success" });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = eventHandle;
