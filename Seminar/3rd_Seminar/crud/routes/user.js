const express = require("express");
const router = express.Router();
const util = require("../lib/util");
const responseMessage = require("../constants/responseMessage");
const statusCode = require("../constants/statusCode");

const users = require("./../dbMockUp/user");

/* 

sign up
METHOD : POST
URI : localhost:3000/user/signup
REQUEST BODY : id, name, password, email
RESPONSE STATUS : 200 (OK)
RESPONSE DATA : All User Data

*/

router.post("/signup", (req, res) => {
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
});

/* 

login
METHOD : POST
URI : localhost:3000/user/login
REQUEST BODY :  password, email
RESPONSE STATUS : 200 (OK)
RESPONSE DATA : id,name,email

*/

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // request Data가 하나라도 없다면 400 error 반환!
  if (!email || !password) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  }

  // 가입되지 않은 email인 경우에는 409 에러 반환!
  const user = users.filter((obj) => obj.email === email)[0];
  if (user) {
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
});
module.exports = router;
