const express = require('express');
const { checkUser } = require('../../../middlewares/auth');
const router = express.Router();

router.get('/', require('./postListGET'));
router.get('/:postId',checkUser, require('./postGET'));
router.post('/', require('./postPOST'));
router.put('/:postId', require('./postPUT'));
router.delete('/:postId', require('./postDELETE'));

module.exports = router;
