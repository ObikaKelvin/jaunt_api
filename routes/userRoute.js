const express = require('express');
const {
    verifyContacts
} = require('../controllers/userController');
const ProtectRoute = require('../middlewares/ProtectRoute');

const router = express.Router();

router.use(ProtectRoute);

// router.patch('/me', joinActivity);
router.post('/verifyContacts', verifyContacts);

module.exports = router;