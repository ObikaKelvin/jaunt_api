const express = require('express');
const {
    getAllActivities,
    createActivity,
    joinActivity,
    leaveActivity,
    getOneActivity,
    updateActivity
} = require('../controllers/activityController');
const ProtectRoute = require('../middlewares/ProtectRoute');

const router = express.Router();

router.use(ProtectRoute);

router.route('/')
.get(getAllActivities)
.post(createActivity)

router.route('/:id')
.get(getOneActivity)
.patch(updateActivity)
// .delete(deleteGroup)

router.patch('/:activityId/join', joinActivity);
router.patch('/:activityId/leave', leaveActivity);

module.exports = router;