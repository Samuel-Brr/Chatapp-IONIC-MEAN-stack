const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Chat = new Schema({
    name: {
        type:String,
        required: true,
        unique: true,
    },
    mdp: {
        type:String,
        required: true
    },
    image: {
        type:String,
        required: true,
    },
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message'
        }
    ],
    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'userRole',
            default: ObjectId('62c4497b3cd75eec1a011126')
        },
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'adminRole'
        }
    ]
})

module.exports = mongoose.model('Chat', Chat);