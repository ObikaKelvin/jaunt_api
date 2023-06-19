const express = require('express');
const errorController = require('./controllers/errorController');

const app = express();

// test get route
app.get('/', (req, res) => res.status(200).json({
    message: "success"
}))

app.use(errorController)

module.exports = app;