const express = require('express');
const router = express.Router();

router.post('/signup', require('./userSignupPOST'));
router.post('/login', require('./userLoginPOST'));
router.get('/user/:id', require('./userGET'));
router.put('/profile/:id', require('./userProfilePUT'));
router.delete('/profile/:id', require('./userProfileDELETE'));
router.get('/list', require('./userListGET'));
router.get('/test', require('./test'));

module.exports = router;
