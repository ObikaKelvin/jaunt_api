const express = require('express');
const {
    getAllGroups,
    createGroup,
    getGroup,
    updateGroup,
    deleteGroup,
    joinGroup,
    leaveGroup
} = require('../controllers/groupController');
const ProtectRoute = require('../middlewares/ProtectRoute');

const router = express.Router();

router.use(ProtectRoute);

router.route('/')
.get(getAllGroups)
.post(createGroup)

// router.route('/:id')
// .get(getGroup)
// .post(updateGroup)
// .delete(deleteGroup)

router.post('/:id/join/:inviteCode', joinGroup);
router.post('/:id/leave', leaveGroup);

module.exports = router;