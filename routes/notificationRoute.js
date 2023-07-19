const express = require('express');
const {
    getAllNotifications,
    createNotification,
    readNotifications,
} = require('../controllers/notificationController');
const ProtectRoute = require('../middlewares/ProtectRoute');

const router = express.Router();

router.use(ProtectRoute);

router.route('/')
.get(getAllNotifications)
.post(createNotification)
.patch(readNotifications)

router.route('/:id')
.patch(readNotifications)

module.exports = router;