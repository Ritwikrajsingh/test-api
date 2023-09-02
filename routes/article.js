const express = require('express');
const article = express.Router();
const articleController = require('../controllers/article')

article.get('/:id', articleController.getArticle)
// article.post('/', articleController.postArticle)

module.exports = article;