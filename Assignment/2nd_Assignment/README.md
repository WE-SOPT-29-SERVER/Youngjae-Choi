# 2nd Seminar Assignment :fire::fire::fire:

![image](https://user-images.githubusercontent.com/49263163/137316909-16d717ae-801d-471d-82ef-efa8c661cdba.png)

---

# Level 2 & Level 3

이번에는 Level2와 Level3가 크게 다르지 않아 한꺼번에 진행했다.

## routes/api/blog/index.js

```javascript
const express = require("express"); // express 모듈 불러오기
const router = express.Router(); // Router() 미들웨어 불러오기

router.get("/post", (req, res) => {
  // Get method로 api/blog/post 요청이 들어온다면
  const result = {
    // 해당 로직을 실행한다
    status: 200,
    message: "'api/blog/post' router 👀",
  };
  res.status(200), send(result);
});

module.exports = router; // 생성한 router 객체를 모듈로 반환한다.

```

api/blog/post 를 라우팅해준다!



## routes/api/users/index.js

```javascript
const express = require("express"); 
const router = express.Router();

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

module.exports = router; 

```

api/users에 있는 index.js 파일에서,  
/login 과 /signup을 전부 라우팅 해준다!



## /routes/index.js

```javascript
const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// blog와 users 폴더를 use 한다.
router.use("/api/blog", require("./api/blog"));
router.use("/api/users", require("./api/users"));

module.exports = router;

```

가장 메인이 되는 routes의 index.js에서는 위에서 생성한 blog와 users 폴더를 전부 use 해준다!! 



<img width="215" alt="스크린샷 2021-10-14 오후 9 28 05" src="https://user-images.githubusercontent.com/49263163/137317152-c3f77561-aec3-4aff-8afe-c06bc61749f0.png">

최종적인 라우팅 디렉토리의 구성은 위와 같다!  
이번 과제는 세미나 때 한 내용만으로도 쉽게 해결이 가능하다! 🔥

