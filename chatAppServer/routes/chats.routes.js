const express = require('express');
const router = express.Router();
const Chat = require('../models/chat.model');
const bcrypt = require('bcrypt')

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
    // console.log(req.body)

    const name = req.body.name;
    const mdp = req.body.mdp
    const image = req.body.imageUrl
    const messages = req.body.messages

    bcrypt.hash(mdp,12)
        .then(hashedMdp =>{
            const newChat = new Chat(
                {name,
                mdp: hashedMdp,
                image,
                messages}
            )
            newChat.save()
                .then((resObj) => res.status(201).send(resObj))
                .catch(err => {
                    console.log("Couldn't save the chat", err)
                    res.status(500).send(err)
                })
        })
        .catch(e => {
            console.log("An error happened when hashing the password", e)
            res.status(500).send(e)
        })
})

 module.exports = router;