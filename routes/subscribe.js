const express = require("express")
const subscribe = express.Router()
const subscribeController = require('../controllers/subscribe')

subscribe.post('/', subscribeController.subscribe)

module.exports = subscribe