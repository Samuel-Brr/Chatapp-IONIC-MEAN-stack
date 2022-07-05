const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userRole = new Schema({
    description: "Standard role for non-admin users, can only CRUD on hiw own items",
    users: [
        {
            type: Schema.Types.ObjectId, ref: 'Chat'
        }
    ]
})

module.exports = mongoose.model('userRole', userRole)
