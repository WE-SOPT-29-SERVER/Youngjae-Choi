const util = require('../../../lib/util');
const responseMessage = require('../../../constants/responseMessage');
const statusCode = require('../../../constants/statusCode');
const users = require('../../../dbMockup/user');

/* 
update profile
METHOD : DELETE
URI : localhost:3000/user/profile/:id
REQUEST BODY :  name
RESPONSE STATUS : 200 (OK)
RESPONSE DATA : 삭제하고난 다음의 user 정보
*/

module.exports = async (req, res) => {
  const { id } = req.params;

  // request params가 잘못됐을 때
  if (!id) {
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.OUT_OF_VALUE));
  }

  const existingUser = users.filter((obj) => obj.id === +id)[0];

  if (!existingUser) {
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
  }
  const newUsers = users.filter((obj) => obj.id !== +id)[0];

  res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.UPDATE_DELETE_SUCCESS, newUsers));
};
