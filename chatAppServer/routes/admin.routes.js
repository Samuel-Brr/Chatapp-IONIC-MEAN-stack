const express = require('express');
const router = express.Router();
const isAdmin = require('../middleware/is-admin')
const passport = require('passport')


router.get('/', isAdmin, passport.authenticate('jwt', {session: false}), (req,res) => {
        res.send({message: "toto"})
})

module.exports = router;