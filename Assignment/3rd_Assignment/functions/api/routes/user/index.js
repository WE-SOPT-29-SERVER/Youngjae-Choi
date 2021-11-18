const express = require('express');
const router = express.Router();

// '/user/signup'으로 오는 요청을 userSignupPOST 파일에서 처리
router.post('/signup', require('./userSignupPOST'));
router.post('/login', require('./userLoginPOST'));
router.get('/profile/:id', require('./userProfileGET'));
router.put('/profile/:id', require('./userProfilePUT'));
router.delete('/profile/:id', require('./userProfileDELETE'));

module.exports = router;
