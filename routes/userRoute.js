const express = require('express');
const {
    getMe,
    verifyContacts
} = require('../controllers/userController');
const ProtectRoute = require('../middlewares/ProtectRoute');

const router = express.Router();

router.use(ProtectRoute);

router.get('/me', getMe);
router.post('/verifyContacts', verifyContacts);

module.exports = router;