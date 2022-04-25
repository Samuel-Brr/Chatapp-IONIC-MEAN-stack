const express = require('express');
const router = express.Router();
const isAdmin = require('../middleware/is-admin')

router.get('/', isAdmin, (req,res) => {
    res.send({message: "toto"})
})

module.exports = router;