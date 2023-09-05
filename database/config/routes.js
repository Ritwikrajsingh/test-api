const welcome = require('../../routes/welcome')

module.exports = (app) => {
    console.log("this is a test");
    app.use('/', welcome)
}