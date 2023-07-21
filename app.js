const express = require('express');
const morgan = require('morgan');

const errorController = require('./controllers/errorController');
const router = require('./routes');
const AppError = require('./utils/appError');

const app = express();

// Development logging
// if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
// }

// Body parser, reading data from body into req.body
app.use(express.json());

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