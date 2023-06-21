const express = require('express');
const authRoute = require('./authRoute');
const groupRoute = require('./groupRoute');
const preferenceRoute = require('./preferenceRoute');

const router = express.Router({ mergeParams: true });

router.use('/auth', authRoute);
router.use('/groups', groupRoute);
router.use('/preferences', preferenceRoute);

module.exports = router;