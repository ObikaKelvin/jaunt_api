const express = require('express');
const {
    signup,
    login,
    signInWithGoogle
} = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/signInWithGoogle', signInWithGoogle);
router.post('/login', login)

module.exports = router;