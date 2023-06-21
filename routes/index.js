const express = require('express');
const authRoute = require('./authRoute');
const groupRoute = require('./groupRoute');

const router = express.Router({ mergeParams: true });

router.use('/auth', authRoute);
router.use('/groups', groupRoute);

module.exports = router;