const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Message = new Schema({
    message: String,
    time: String,
    chat_id: String,
    from: String,
})

module.exports = mongoose.model('Message', Message)