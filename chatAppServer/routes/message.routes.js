const express = require('express');
const router = express.Router();

const Message = require('../models/message.model')
const Chat = require('../models/chat.model')

router.get('/', (req,res,next) => {
    Message.find({})
    .then(messages => {
        res.status(200).send(messages)
    })
    .catch(err => {
        console.log("Couldn't retrieve the messages", err);
        res.status(500).send(err)
    })
})

router.post('/', (req,res,next)=>{
    const newMessage = new Message(req.body)
    newMessage.save()
        .then((resObj) => {
            //find the chat that the message bellong to
            //Push message to the chat
            Chat.findById(req.body.chat_id)
                .then(chat => {
                    chat.messages.push(resObj._id)
                    chat.save()
                        .then(savedChat => res.status(200).send(savedChat))
                        .catch(err => res.status(500).send(err))
                })
                .catch(err => {
                    console.log("Couldn't find the chat corresponding to the message", err)
                    res.status(500).send(err)
                })
        })
        .catch(err => {
            console.log("Couldn't save the message", err)
            res.status(500).send(err)
        })
})

module.exports = router