const express = require('express');
const router = express.Router();

router.post('/signup', require('./userSignupPOST'));
router.post('/login', require('./userLoginPOST'));
router.get('/profile/:id', require('./userProfileGET'));
router.put('/profile/:id', require('./userProfilePUT'));
router.delete('/profile/:id', require('./userProfileDELETE'));

module.exports = router;
