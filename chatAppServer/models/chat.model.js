const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Chat = new Schema({
    name: String,
    image: String,
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message'
        }
    ]
})

module.exports = mongoose.model('Chat', Chat);