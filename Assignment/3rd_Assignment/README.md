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

# Level 3 

Firebase 세팅 / 배포는 세미나 방식을 그대로 따라가기만 하면 된다!..   
그런데 나에게는 정말 다양한 에러가 생겼다 ㅎ

## 에러 핸들링

### 1) serve가 안돼요.. 엉엉 ㅠ

![image](https://user-images.githubusercontent.com/49263163/142492567-cc381274-d2e5-4e71-9eda-5ad600ba87b7.png)

`npm run serve` 명령어를 사용하는 도중 위와 같은 에러를 만났는데...  
장장 이틀에 걸쳐서 이리 뛰고 저리 뛰고 동에 번쩍 서에 번쩍 오사카 난리 부루스를 췄는데...  
킹 갓 제너럴 팟장님의 도움을 받아 `firebase serve -p 5000 -o 127.0.0.1` 명령어를 사용하여 해결했다.  
package.json의 serve 스크립트의 값을 위의 코드로 바꾸어주자!  
정확한 이유는 모르겠지만 나의 컴퓨터에서 로컬 호스트가 열리지 않는 문제가 있었고, 해당 코드를 통해 포트와 주소를 직접 지정해주어 로컬 호스트를 열어주는 코드이다. 홀홀..  
늦었지만... 비슷한 문제를 겪는 친구들이 있다면 꼭 이걸 보고 해결하길 ㅎ  

### 2) 배포후 API 요청을 하는데 `Your client does not have permission to get URL <code>/api/user/signup</code> from this server.` 오류가 난드아 ㅠㅠ

이 경우는 접근 권한이 막혀있기 때문에, 접근 권한을 등록해주어야한다.

1. https://console.cloud.google.com/home 에 들어가서 Cloud Function 탭을 누른다
2. 원하는 함수를 체크한 뒤 권한(permission) 탭을 누른다
3. `주 구성원 추가` 버튼을 누른 뒤 `새 주 구성원` 탭에는 `allUsers` 를 입력하고, `역할 선택` 에는 `CLoud Function 호출자 ( 또는 Cloud Functions Invoker)` 를 선택한뒤 추가해준다.

[참고- 우리의 친구 스오플](https://stackoverflow.com/questions/47511677/firebase-cloud-function-your-client-does-not-have-permission-to-get-url-200-fr)
