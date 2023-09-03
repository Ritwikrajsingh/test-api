/* requires */
const express = require('express');
const router = express.Router();
const validator = require('./validator');
const controller = require('./controller');

router.get('/all-blogs',

    /* validate request */
    validator.validateRequestURL,

    /* get from data storage */
    controller.getBlogs)

router.post('/',

    /* validate request */
    validator.validateRequestURL,

    /* get from data storage */
    controller.createBlog)

router.get('/:blogId',

    /* validate request */
    validator.validateRequestURL,

    /* get from data storage */
    controller.getOneBlog)

/* exports */
module.exports = router;