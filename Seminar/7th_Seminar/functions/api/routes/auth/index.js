const express = require('express');
const router = express.Router();

router.post('/signup', require('./authSignupPOST'));
router.post('/login/email', require('./authLoginPOST'));

module.exports = router;
