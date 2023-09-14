const express = require('express')
const router = express.Router()
const validator = require('./validator')
const controller = require('./controller')

router.post('/:commentId',

    /* validate request */
    validator.validateRequestURL,

    /* get from data storage */
    controller.createReply)

router.get('/:commentId',

    /* validate request */
    validator.validateRequestURL,

    /* get from data storage */
    controller.getReplies)

module.exports = router