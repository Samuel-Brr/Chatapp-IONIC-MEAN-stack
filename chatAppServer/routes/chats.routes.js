const express = require('express');
const router = express.Router();
const Chat = require('../models/chat.model');

 router.get('/', (req,res,next) => {
     Chat.find({})
        .populate('messages')
        .then(chats => {
            res.status(200).send(chats)
        })
        .catch(err => {
            console.log("Couldn't retrieve the chats", err);
            res.status(500).send(err)
        })
 })

router.post('/', (req,res,next)=>{
    const newChat = new Chat(req.body)
    newChat.save()
        .then((resObj) => res.status(201).send(resObj))
        .catch(err => {
            console.log("Couldn't save the chat", err)
            res.status(500).send(err)
        })
})

 module.exports = router;