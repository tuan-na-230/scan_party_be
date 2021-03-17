const eventModel = require("./model");

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
        const item = await eventModel.create(req.body.evenInfo);
        item && res.status(200).json({ message: "create_successfully" });
      } catch (error) {
        next(error);
      }
    } else {
      res.status(401).json({ message: "required_body" });
    }
  },
};

module.exports = eventHandle;
