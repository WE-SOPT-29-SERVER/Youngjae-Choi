const express = require('express');
const router = express.Router();

router.post('/signup', require('./userSignupPOST'));
router.post('/login', require('./userLoginPOST'));
router.get('/:userId', require('./userGET'));
router.put('/:userId', require('./userProfilePUT'));
router.delete('/:userId', require('./userProfileDELETE'));
router.get('/list', require('./userListGET'));
router.get('/test', require('./test'));

module.exports = router;
