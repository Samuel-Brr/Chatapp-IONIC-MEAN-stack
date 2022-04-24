const express = require('express');
const router = express.Router();
const Chat = require('../models/chat.model');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const path = require('path')
const fs = require('fs')
const passport = require('passport')

const pathToKey = path.join(__dirname, '..', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

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

router.post('/connexion', (req,res,next) => {
    const name = req.body.name;
    const mdp = req.body.mdp;

    Chat.findOne({name: name})
        .then(user => {
            if(!user){
                return res.status(422).send({statut:"Identifiant ou mot de passe incorrecte"})
            }

            bcrypt.compare(mdp, user.mdp)
                .then(doMatch => {
                    if(doMatch){

                        const accesToken = issueJWT(user)
                        return res.status(200).json({user_id: user._id, success: true, accesToken: accesToken.token, expiresIn: accesToken.expires})

                    }

                    return res.status(422).send({statut:"Identifiant ou mot de passe incorrecte"})
                })
                .catch(e => {
                    console.log(e)
                    res.status(500).send(console.log("La comparaison des mots de passe a échoué", e))
                })
        })
        .catch(e => {
            console.log(e)
            res.status(500).send(console.log("L'opération findOne à échouée"))
        })
})

router.get('/protected', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.status(200).json({success: true, message: 'you are authorized'})
})


function issueJWT(user) {
    const _id = user._id;
  
    const expiresIn = '1d';
  
    const payload = {
      sub: _id,
      iat: Date.now()
    };
  
    const signedToken = jwt.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' });
  
    return {
      token: "Bearer " + signedToken,
      expires: expiresIn
    }
  }

module.exports = router;