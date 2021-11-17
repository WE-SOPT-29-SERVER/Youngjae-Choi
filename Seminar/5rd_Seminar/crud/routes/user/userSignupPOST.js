const util = require("../../lib/util");
const responseMessage = require("../../constants/responseMessage");
const statusCode = require("../../constants/statusCode");

const users = require("../../dbMockUp/user");

module.exports = async (req, res) => {
  // email, password
  // const email = req.body.email;
  // const name = req.body.name;
  // const password = req.body.password;

  // destructuring assignment
  // 비구조화 할당
  const { email, name, password } = req.body;

  // request Data가 하나라도 없다면 400 error 반환!
  if (!email || !name || !password) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  }

  // 이미 있는 email인 경우에는 409 에러 반환!
  const alreadyUser = users.filter((obj) => obj.email === email).length > 0;
  if (alreadyUser) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, responseMessage.ALREADY_EMAIL));
  }

  const newUser = {
    id: users.length + 1,
    name,
    password,
    email,
  };

  res
    .status(statusCode.OK)
    .send(util.success(statusCode.OK, responseMessage.CREATED_USER, newUser));
};
