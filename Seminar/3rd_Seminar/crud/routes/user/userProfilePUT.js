const util = require("../../lib/util");
const responseMessage = require("../../constants/responseMessage");
const statusCode = require("../../constants/statusCode");
const users = require("./../../dbMockup/user");

/* 
update profile
METHOD : PUT
URI : localhost:3000/user/profile/:id
REQUEST BODY :  name
RESPONSE STATUS : 200 (OK)
RESPONSE DATA : 비밀번호를 제외한 Updated User 정보
*/

module.exports = async (req, res) => {
  const { id } = req.params;
  const { newName } = req.body;
  // request params 또는 request body가 잘못됐을 때
  if (!id || !newName) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  }

  const existingUser = users.filter((obj) => obj.id === +id)[0];

  if (!existingUser) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
  }
  const updatedUser = { ...existingUser, name: newName };

  res
    .status(statusCode.OK)
    .send(
      util.success(
        statusCode.OK,
        responseMessage.UPDATE_PROFILE_SUCCESS,
        updatedUser
      )
    );
};
