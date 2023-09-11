const express = require('express')
const welcome = express.Router()
const welcomeController = require('../controllers/welcome')

// welcome.get('/', welcomeController.getBlogs)
// welcome.post('/', welcomeController.createBlog)
// welcome.get('/:blogId', welcomeController.getOneBlog)

// welcome.post('/comment/:blogId', welcomeController.createComment)
// welcome.get('/comment/:blogId', welcomeController.getComment)

// welcome.post('/reply/:commentId', welcomeController.createReply)
welcome.get('/reply/:commentId', welcomeController.getReply)

module.exports = welcome