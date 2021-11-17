const util = require("../../lib/util");
const responseMessage = require("../../constants/responseMessage");
const statusCode = require("../../constants/statusCode");

const users = require("../../dbMockUp/user");

module.exports = async (req, res) => {
  const { email, password } = req.body;

  // request Data가 하나라도 없다면 400 error 반환!
  if (!email || !password) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  }

  // 가입되지 않은 email인 경우에는 409 에러 반환!
  const user = users.filter((obj) => obj.email === email)[0];

  if (!user) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
  }

  // 비밀번호가 틀린 경우에는
  if (user.password != password) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, responseMessage.MISS_MATCH_PW));
  }

  // 기본적으로 response 객체를 반환한다.
  // 근데 이게 함수의 마지막 부분일 필요는 없다.
  // response를 보내고 다른 작업을 할수도 있다.
  res.status(statusCode.OK).send(
    util.success(statusCode.OK, responseMessage.LOGIN_SUCCESS, {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    })
  );
};
