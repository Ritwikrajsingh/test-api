const blog = require('../../routes/blogs')
// const reply = require('../../routes/reply')
// const comment = require('../../routes/comment')
const welcome = require('../../routes/welcome')

module.exports = (app) => {
    app.use('/', welcome)
    app.use('/blog', blog)
    // app.use('/reply', reply)
    // app.use('/comment', comment)
}