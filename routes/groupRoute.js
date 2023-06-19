const express = require('express');
const {
    getAllGroups,
    createGroup,
    getGroup,
    updateGroup,
    deleteGroup
} = require('../controllers/groupController');

const router = express.Router();

router.route('/')
.get(getAllGroups)
.post(createGroup)

router.route('/:id')
.get(getGroup)
.post(updateGroup)
.delete(deleteGroup)

module.exports = router;