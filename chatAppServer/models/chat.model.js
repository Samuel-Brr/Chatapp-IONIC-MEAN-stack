const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userRoleModel = require('./userRole.model')
const userRoleId = userRoleModel.findById('62c460f6a9adabb6d0525b64').then(obj => {return obj._id})


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
    roles: {
        user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'userRole',
                default: '62c460f6a9adabb6d0525b64'    
            },

        admin: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'adminRole'
            }
    }
})

module.exports = mongoose.model('Chat', Chat);