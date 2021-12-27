const util = require("../../lib/util");
const responseMessage = require("../../constants/responseMessage");
const statusCode = require("../../constants/statusCode");
const users = require("./../../dbMockup/user");

/* 
get profile
METHOD : GET
URI : localhost:3000/user/profile/:id
REQUEST BODY :  password, email
RESPONSE STATUS : 200 (OK)
RESPONSE DATA : 비밀번호를 제외한 User 정보
*/

module.exports = async (req, res) => {
  const { id } = req.params;

  // request params가 잘못됐을 때
  if (!id) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, responseMessage.OUT_OF_VALUE));
  }

  const user = users.filter((obj) => obj.id === +id)[0];

  if (!user) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
  }
  const data = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  res
    .status(statusCode.OK)
    .send(
      util.success(statusCode.OK, responseMessage.READ_PROFILE_SUCCESS, data)
    );
};
