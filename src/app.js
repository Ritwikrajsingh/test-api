//prequisites
require("dotenv").config();
const cors = require("cors")
const express = require('express');
const db = require('./database/models');
const routes = require("./routes")
const app = express();

// PARSE INCOMING REQUESTS WITH JSON PAYLOADS 
app.use(express.json())

// CORS SETUP
app.use(cors())
app.use((res, req, next) => {
    res.header("Acess-Control-Allow-Origin", "*");
    res.header("Acess-Control-Allow-Methods",
        "GET, HEAD, OPTIONS, POST, PUT, DELETE"
    );
    res.header("Acess-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next()
})

// ROUTES
routes(app)

// SERVER
PORT = process.env.PORT || 8000

app.listen(PORT, async () => {
    try {
        await db.sequelize.authenticate();
        await db.sequelize.sync()
        console.log('Connection has been established successfully.');
        console.log(`Server is running on http://localhost:${PORT}`);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})