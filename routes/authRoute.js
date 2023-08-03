const express = require('express');
const {
    signup,
    login,
    signInWithGoogle,
    refreshToken
} = require('../controllers/authController');
const ProtectRoute = require('../middlewares/ProtectRoute');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login)
router.post('/signInWithGoogle', signInWithGoogle);
router.post("/refresh", ProtectRoute, refreshToken);


module.exports = router;