const express = require('express');
const passport = require('passport')
const {body} = require('express-validator')

const messagesController = require('../controllers/messages')

//Ouverture du router
const router = express.Router();

router.get('/',
    passport.authenticate('jwt', {session: false}),
    messagesController.getMessages
)

router.post('/',
    body('message').not().isEmpty().trim().escape(),
    body('chat_id').isMongoId(),
    body('from').isMongoId(),
    body('time').not().isEmpty().trim().escape(), 
    passport.authenticate('jwt', {session: false}),
    messagesController.postMessages
)

router.delete('/',
    body('message_id').isMongoId(),
    passport.authenticate('jwt', {session: false}),
    messagesController.deleteMessages
)

router.put('/',
    body('body.message_id').isMongoId(),
    body('body.message').not().isEmpty().trim().escape(),
    passport.authenticate('jwt', {session: false}),
    messagesController.updateMessages
)

module.exports = router