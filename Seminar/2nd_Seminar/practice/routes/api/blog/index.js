const express = require("express"); // express 모듈 불러오기
const router = express.Router; // Router() 미들웨어 불러오기

router.get("/post", (req, res) => {
  // Get method로 api/post 요청이 들어온다면
  const result = {
    // 해당 로직을 실행한다
    status: 200,
    message: "'api/blog/post' router 👀",
  };
  res.status(200), send(result);
});

module.exports = router; // 생성한 router 객체를 모듈로 반환한다.
