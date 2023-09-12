const blog = require('./blogs')
const reply = require('./replies')
const comment = require('./comments')
const welcome = require('./welcome')

module.exports = (app) => {
    app.use('/', welcome)
    app.use('/blog', blog)
    app.use('/reply', reply)
    app.use('/comment', comment)
}