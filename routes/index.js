const express = require('express');
const authRoute = require('./authRoute');
const groupRoute = require('./groupRoute');
const activityRoute = require('./activityRoute');
const preferenceRoute = require('./preferenceRoute');

const router = express.Router({ mergeParams: true });

router.use('/auth', authRoute);
router.use('/groups', groupRoute);
router.use('/activities', activityRoute);
router.use('/preferences', preferenceRoute);

module.exports = router;