const express = require('express');
const passport = require('passport')
const {body} = require('express-validator')

const chatsController = require('../controllers/chats')

//Ouverture du router
const router = express.Router();

 router.get('/',
    passport.authenticate('jwt', {session: false}), 
    chatsController.getChats
)

router.post('/',
    body('name').not().isEmpty().trim().escape(),
    body('mdp').isLength({ min: 8 }).trim().escape(),
    body('imageUrl').isURL(),
    body('messages').isEmpty(),
    chatsController.postInscription 
)

router.post('/connexion',
    body('name').not().isEmpty().trim().escape(),
    body('mdp').isLength({ min: 8 }).trim().escape(),
    chatsController.postConnexion
)

router.get('/protected',
    passport.authenticate('jwt', {session: false}),
    (req, res, next) => {
    res.status(200).json({success: true, message: 'you are authorized'})
})




module.exports = router;