const Message = require('../models/message');

exports.postMessage = async (text) => {
    try {
        const message = new Message({ text });
        await message.save();
        return message;
    } catch (error) {
        throw error;
    }
};
