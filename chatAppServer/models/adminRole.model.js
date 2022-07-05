const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminRole = new Schema({
    description: "Admin role, can access admin dashboard, delete chats and messages accross the entire app",
    users: [
        {
            type: Schema.Types.ObjectId, ref: 'Chat'
        }
    ]
})

module.exports = mongoose.model('adminRole', adminRole)
