const emailHandler = require("../../email_helper");
const guestHandler = require("../guest");
const ticketHandler = require("../ticket");
const eventModel = require("./model");
const moment = require("moment");

const QRCode = require("qrcode");
const { MongooseDocument } = require("mongoose");
const guestModel = require("../guest/model");
const chatHandler = require("../chatRoom");
const ticketModel = require("../ticket/model");
const e = require("cors");
const ratingHandler = require("../rating");

const eventHandle = {
  async getManyEvent(req, res, next) {
    if (req.body) {
      try {
        let { page = 1, size = 10, sort = "asc", sortBy = "name", email } = req.query;
        page = parseInt(page);
        size = parseInt(size);

        const skip = page * size;
        const limit = size;
        const item = await eventModel
          .find({ owner: email })
          .populate("rating")
          .skip(skip)
          .limit(limit);
        const count = await eventModel.find().count();
        res.status(200).json({
          content: item,
          pagination: { page: page, size: size, total: count },
        });
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
        const item = await eventModel.findOne({ _id: eventId }).populate('rating');
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
        item && res.status(200).json({ message: "create_success" });
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
        const chat = await chatHandler.createOne({ name: eventInfo.name }, next);
        const rating = await ratingHandler.createOne(next);
        const item = await eventModel.create({ ...eventInfo, chat: chat._id, rating: rating._id });
        guestInfo.forEach(async (ele, index) => {
          const ticket = await ticketHandler.createOneController(
            item._id,
            ticketTemplateInfo.effectiveDate || 14,
            next
          );
          const guest = await guestHandler.createOneByController(
            ele,
            ticket._id,
            item._id,
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
            linkInfo: `http://localhost:3000/guests/${item._id}`
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

  async registerForm(req, res, next) {
    try {
      const { eventId } = req.params;
      const data = req.body;
      const event = await eventModel.findById(eventId)
      const ticket = await ticketHandler.createOneController(eventId, 14, next);
      const guest = await guestHandler.createOneByController(
        data,
        ticket._id,
        eventId,
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
        email: data.email,
        qrcode: qrCode,
        nameEvent: event.name,
        addressEvent: event.address,
        dateEvent: moment(event.time.date).format("DD-MM-YYYY"),
        beginTimeEvent: moment(event.time.beginTime).format("HH:mm"),
        endTimeEvent: moment(event.time.endTime).format("HH:mm"),
        nameGuest: data.name,
      };
      emailHandler.sendTicket(dataSendTicket);
      res.status(200).json({ message: `create_success_we_sent_ticket_to_${data.email}` });
    } catch (error) {
      next(error);
    }
  },

  async delEvent(req, res, next) {
    try {
      const { eventId } = req.params;
      const guests = await guestModel.find({ event: eventId });
      const event = await eventModel.findById(eventId)
      const item = await eventModel.findByIdAndDelete(eventId);
      if (item) {
        guests.forEach(ele => {
          let data = { email: ele.info ? ele.info.email : '', name: event.name }
          emailHandler.sendMailDelEvent(data)
        })
        res.status(200).json({ message: "delete_event_success" });
      }
    } catch (error) {
      next(error);
    }
  },
};

module.exports = eventHandle;
