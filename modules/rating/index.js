const guestModel = require("../guest/model");
const readXlsxFile = require("read-excel-file/node");
const _ = require("lodash");
const shortid = require("shortid");
const ticketModel = require("./model");
const ratingModel = require("./model");
const eventModel = require("../event/model");

const ratingHandler = {
    async createOne(next) {
        try {
            const rating = await ratingModel.create({});
            return rating;
        } catch (error) {
            next(error);
        }
    },

    async UpdateRating(res, req, next) {
        try {
            const { eventId } = res.params;
            const newRating = res.body;
            const event = await eventModel.findById(eventId);
            if (event) {
                const rating = await ratingModel.findById(event.rating);
                const listRating = rating.ratingList;
                listRating.push(newRating);
                const result = await ratingModel.findByIdAndUpdate(event.rating, { ratingList: [...listRating] });
                if (result) {
                    req.status(200).json({ message: 'rating_success' })
                }
            }
        } catch (error) {
            next(error)
        }
    }
};

module.exports = ratingHandler;
