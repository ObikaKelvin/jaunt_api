const express = require('express');
const {
    getAllGroups,
    createGroup,
    getGroup,
    updateGroup,
    deleteGroup,
    joinGroup
} = require('../controllers/groupController');
const ProtectRoute = require('../middlewares/ProtectRoute');

const router = express.Router();

router.use(ProtectRoute);

router.route('/')
.get(getAllGroups)
.post(createGroup)

router.route('/:id')
.get(getGroup)
.post(updateGroup)
.delete(deleteGroup)

router.post('/:id/join/:inviteCode', joinGroup)

module.exports = router;