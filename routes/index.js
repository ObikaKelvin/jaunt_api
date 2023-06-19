const express = require('express');
const groupRoute = require('./groupRoute');

const router = express.Router({ mergeParams: true });

router.use('/groups', groupRoute);

module.exports = router;