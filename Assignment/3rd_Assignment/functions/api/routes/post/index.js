const express = require('express');
const router = express.Router();

// '/post/signup'으로 오는 요청을 userSignupPOST 파일에서 처리
router.get('/', require('./postGET'));
router.get('/:id', require('./postIdGET'));
router.post('/', require('./postPOST'));
router.put('/:id', require('./postIdPUT'));
router.delete('/:id', require('./postIdDELETE'));

module.exports = router;
