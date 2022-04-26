const {validationResult} = require('express-validator')

const Message = require('../models/message.model')
const Chat = require('../models/chat.model')


exports.getMessages = (req,res,next) => {
    Message.find({})
    .then(messages => {
        res.status(200).send(messages)
    })
    .catch(err => {
        console.log("Couldn't retrieve the messages", err);
        res.status(500).send(err)
    })
}

exports.postMessages = (req,res,next)=>{
    
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    
    const newMessage = new Message(req.body)
    newMessage.save()
        .then((resObj) => {
            //find the chat that the message bellong to
            //Push message to the chat
            Chat.findById(req.body.chat_id)
                .then(chat => {
                    chat.messages.push(resObj._id)
                    chat.save()
                        .then(savedChat => res.status(200).send(resObj))
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
}

exports.deleteMessages = (req,res) => {

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    console.log(req.body.message_id)
    const messageId = req.body.message_id

    Message.findOneAndDelete({_id: messageId}, (e,doc) => {
        if(e){res.status(500).send(e)}
        res.send({succes: true, response: doc})
    })
        
}

exports.updateMessages = (req,res) => {

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    console.log(req.body)

    const messageId = req.body.body.message_id
    const message = req.body.body.message

    Message.findByIdAndUpdate(messageId, {message: message})
        .then((doc) => res.status(204).send(doc))
        .catch((e)=>res.status(500).send(e))
}