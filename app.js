const express = require('express');

const errorController = require('./controllers/errorController');

const router = require('./routes');

const AppError = require('./utils/appError');

const app = express();

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// test get route
app.get('/', (req, res) => res.status(200).json({
    message: "success"
}))

app.use('/api/v1', router);

app.use('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorController)

module.exports = app;