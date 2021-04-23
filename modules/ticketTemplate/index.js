const _ = require("lodash");
const ticketTemplateModel = require("./model");

const ticketTemplateHandler = {
    async create(req, res, next) {
        if (req.body) {
            try {
                const backgroundUrl = req.body.backgroundUrl;
                const item = await ticketTemplateModel.create({backgroundUrl});
                item && res.status(200).json({message: 'create_success'})
            } catch (error) {
                next(error)
            }
        } else {
            res.status(404).json({ message: 'required_body' })
        }
    },

    async findMany(req, res, next) {
        try {
            const listTemplate = await ticketTemplateModel.find()
            listTemplate && res.status(200).json(listTemplate)      
        } catch (error) {
            next(error)
        }
    }
};

module.exports = ticketTemplateHandler;
