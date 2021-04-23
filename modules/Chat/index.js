const chatModel = require("./model");

const chatHandler = {
    async getListChat(chatId, next) {
        try {
            const item = await chatModel.findById(chatId);
            return item
        } catch (error) {
            next(error);
        }
    },

    async updateListMessage(chatId, newMessage, next) {
        try {
            const item = await chatModel.findById(chatId);
            if (item) {
                const listMessage = item.messages;
                let dataWillPush;
                if (newMessage.user === "Quản trị viên") {
                    dataWillPush = {...newMessage, isManagerViewed: true}
                } else {
                    dataWillPush = {...newMessage, isManagerViewed: false}
                }
                listMessage.push(dataWillPush);
                await chatModel.findByIdAndUpdate(chatId, { messages: listMessage });
                const result = await chatModel.findById(chatId)
                return result;
            }
        } catch (error) {
            next(error)
        }
    }
};

module.exports = chatHandler;
