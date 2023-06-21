const express = require('express');
const {
    getPreferences,
    setPreference,
    getOnePreference,
    updatePreference,
    deletePreference
} = require('../controllers/preferenceController');
const ProtectRoute = require('../middlewares/ProtectRoute');

const router = express.Router();

router.use(ProtectRoute);

router.route('/')
.get(getPreferences)
.post(setPreference)

router.route('/:id')
.get(getOnePreference)


module.exports = router;