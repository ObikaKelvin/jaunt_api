const express = require('express');
const app = express();

// test get route
app.get('/', (req, res) => res.status(200).json({
    message: "success"
}))

module.exports = app;