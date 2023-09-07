/* requires */
const express = require('express');
const router = express.Router();
const validator = require('./validator');
const controller = require('./controller');

router.post('/:blogId',

    /* validate request */
    validator.validateRequestURL,

    /* get from data storage */
    controller.createComment)

router.get('/:blogId',

    /* validate request */
    validator.validateRequestURL,

    /* get from data storage */
    controller.getComments)

router.get('/single/:commentId',

    /* validate request */
    validator.validateRequestURL,

    /* get from data storage */
    controller.getAComment)

/* exports */
module.exports = router;