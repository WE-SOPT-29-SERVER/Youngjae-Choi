const express = require("express"); // express 모듈 불러오기
const router = express.Router(); // Router() 미들웨어 불러오기

router.post("/login", (req, res) => {
  const result = {
    status: 200,
    message: "'api/users/login' router 👀",
  };
  res.status(200), send(result);
});

router.post("/signup", (req, res) => {
  const result = {
    status: 200,
    message: "'api/users/signup' router 👀",
  };
  res.status(200), send(result);
});

module.exports = router; // 생성한 router 객체를 모듈로 반환한다.
