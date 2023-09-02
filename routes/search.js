const express = require('express')
const search = express.Router()
const searchController = require('../controllers/search')

search.get('/', searchController.searchBlogs)

module.exports = search