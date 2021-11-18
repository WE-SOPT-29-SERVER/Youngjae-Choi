# 3rd Seminar Assignment :fire::fire::fire:

![image](https://user-images.githubusercontent.com/49263163/142497003-aea63600-82b7-4899-ada7-021dec9c9a4c.png)

---

# Level 2 

<img width="300" alt="스크린샷 2021-10-14 오후 9 28 05" src="https://user-images.githubusercontent.com/49263163/142497254-77e4fba0-1d12-4378-8239-0f3b059d6607.png">

라우터 디렉토리 구조!
세미나 때 진행한대로, API 요청에 따라 파일을 구분해주었다🔥

## /routes/index.js

```javascript
const express = require('express');
const router = express.Router();

// '/user' 이하의 경로로 들어온 요청은 모두 user 폴더 안에서 처리
// '/post' 이하의 경로로 들어온 요청은 모두 post 폴더 안에서 처리

router.use('/user', require('./user'));
router.use('/post', require('./post'));

module.exports = router;
```

## /routes/user/index.js

```javascript
const express = require('express');
const router = express.Router();

router.post('/signup', require('./userSignupPOST'));
router.post('/login', require('./userLoginPOST'));
router.get('/profile/:id', require('./userProfileGET'));
router.put('/profile/:id', require('./userProfilePUT'));
router.delete('/profile/:id', require('./userProfileDELETE'));

module.exports = router;
```

## /routes/post/index.js

```javascript
const express = require('express');
const router = express.Router();

router.get('/', require('./postGET'));
router.get('/:id', require('./postIdGET'));
router.post('/', require('./postPOST'));
router.put('/:id', require('./postIdPUT'));
router.delete('/:id', require('./postIdDELETE'));

module.exports = router;

```

