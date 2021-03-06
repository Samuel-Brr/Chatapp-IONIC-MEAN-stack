const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Message = new Schema({
    message: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
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