const chatModel = require("./model");

const chatHandler = {
    async createOne(data, next) {
        try {
            const item = await chatModel.create(data)
            return item
        } catch (error) {
            next(error)
        }
    },

    async getListChat(chatId, next) {
        try {
            const item = await chatModel.findById(chatId);
            return item || 'error'
        } catch (error) {
            next(error);
        }
    }
};

module.exports = chatHandler;
