const express = require('express');
const authRoute = require('./authRoute');
const userRoute = require('./userRoute');
const activityRoute = require('./activityRoute');
const preferenceRoute = require('./preferenceRoute');
const notificationRoute = require('./notificationRoute');

const router = express.Router({ mergeParams: true });

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/activities', activityRoute);
router.use('/preferences', preferenceRoute);
router.use('/notifications', notificationRoute);

module.exports = router;