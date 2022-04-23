const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Chat = new Schema({
    name: {
        type:String,
        required: true,
        unique: true,
    },
    name: {
        type:String,
        required: true
    },
    image: {
        type:String,
        required: false
    },
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message'
        }
    ]
})

module.exports = mongoose.model('Chat', Chat);