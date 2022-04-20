const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Message = new Schema({
    message: {
        type: String,
        required: true
    },
    time: {
        type: String | Date,
    },
    chat_id: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Message', Message)