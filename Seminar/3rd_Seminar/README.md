# 3rd Seminar

![image](https://user-images.githubusercontent.com/49263163/139227038-8e9fd8f8-04d8-47b7-9e21-c8c5efa25583.png)

# 1. HTTP

## 1) HTTP란?

- 하이퍼미디어 문서를 주고받을 수 있는 프로토콜
- Stateless Protocol (무상태 프로토콜) : 서버가 두 요청 간에 어떠한 데이터(상태)도 유지하지 않음 --> 모든 요청이 상호 독립적이다
- 모든 요청이 상호 독립적이라면, 특정 유저가 보낸 서로 다른 요청은 어떻게 구별하냐??  
  --> Cookie, Session, Token을 활용하여 해결한다!
- GET, DELETE 요청에는 REQUEST BODY를 담을 수 없고, POST와 PUT 에서만 REQUEST BODY를 받을 수 있다. 
- REQUEST BODY는 클라이언트 단에서 채워주고, 서버에서는 그 객체를 풀어내서 API에 사용하게 된다.

## 2) Status Code

| 응답 코드 |       표시 상태       |                 의미                 |
| :-------: | :-------------------: | :----------------------------------: |
|    200    |          OK           |                 성공                 |
|    204    |      No Content       |  성공. 전달해줄 응답 데이터는 없음   |
|    304    |     Not Modified      | 캐시 목적. 요청 후 수정된 것이 없음. |
|    400    |      Bad Request      |     서버가 요청을 이해하지 못함      |
|    401    |     Unauthorized      |             인증이 필요              |
|    404    |       Not Found       |    페이지, 리소스를 찾을 수 없음     |
|    500    | Internal Server Error |            서버 내부 오류            |

## 3) request, response

### 3)-1 request

1. URL : param, query를 통해 특정 정보를 요청 (GET, DELETE METHOD 사용시 URI를 식별할때 주로 사용한다)
2. header : 부가적인 정보를 전송 
3. body : XML, JSON, Multi Form 등의 데이터를 담아 요청

### 3)-2 response

- Body : XML, JSON, Multi Form 등의 데이터를 반환한다.

# 2. CRUD

## 1) CRUD 란 ?

- 대부분의 컴퓨터 소프트웨어가 가지는 기본적인 데이터 처리 기능

|  CRUD  | ACTION | HTTP METHOD |  SQL   |
| :----: | :----: | :---------: | :----: |
| CREATE |  생성  |    POST     | INSERT |
|  READ  |  조회  |     GET     | SELECT |
| UPDATE |  수정  |     PUT     | UPDATE |
| DELETE |  삭제  |   DELETE    | DELETE |

## 2) CRUD 실습 - Router

```javascript
router.METHOD('path', (req,res) => {...});
```

1. METHOD : get, post 등 사용할 method를 적어준다.
2. path : 접근할 path를 설정해준다.
3. request : 전달받은 데이터를 request로 담아온다.
   - req.query, req.params, req.headers, req.body, req.file 등으로 다양하게 접근한다
4. response : 전달할 데이터를 response에 담는다.
   - `res.status(xxx)send(json)`
   - `status()`: status code를 정수로 입력한다
   - `send()`: json 형식으로 response body에 입력한다. 

## 3) CRUD 실습 - spread operator `...` (전개연산자)

- 함수를 호출할 때 `... arr`를 사용하면, 이터러블 객체 `arr`이 인수 목록으로 확장된다.

```tsx
let arr = [3, 5, 1];
let arr2 = [8, 9, 15];
let merged = [0, ...arr, 2, ...arr2];
alert(merged); // 0,3,5,1,2,8,9,15

let str = "Hello";
alert( [...str] ); // H,e,l,l,o
```

- 이러한 전개 연산자는 우리가 짠 코드에서도 알 수 있다시피, 이터러블 객체에도 사용이 가능하다.

  ```javascript
  const obj1 = {
    a: 'A',
    b: 'B'
  };
  const obj2 = {
    c: 'C',
    d: 'D'
  };
  const objWrap = {obj1, obj2};
  console.log(objWrap);
  /*
  {
    obj1: {
      a: 'A',
      b: 'B'
    },
    obj2: {
      c: 'C',
      d: 'D'
    }
  }
  */
  ```

  위의 예시와 같이 두개의 객체를 하나의 객체로 묶으면, 객체 각각이 아닌 객체 자체가 들어가 2차원 객체가 되는데..

  ```javascript
  const objWrap = {...obj1, ...obj2};
  console.log(objWrap);
  /*
  {
    a: 'A',
    b: 'B',
    c: 'C',
    d: 'D'
  }
  */
  ```

  위처럼 전개연산자를 사용해주면, 각각의 값을 하나의 객체에 합쳐줄 수 있다. 

---

```javascript
  const updatedUser = { ...existingUser, name: newName };
```

우리가 짠 코드에선 위처럼 사용해주었는데, 여기서 궁금한 점이 생긴다!

```javascript
  const updatedUser = { name: newName, ...existingUser };
```

이렇게 해줘도 값은 똑같을 것 같은데 전개연산자를 먼저 사용해주었을가??
-> 뒤에 온것이 먼저 들어온 값을 덮어쓰기 때문! 
아래와 같이 코드를 짰다면, name이라는 프로퍼티에 newName의 값이 아닌, existingUser의 기존 name이 덮어씌워지게 된다.

## 4) snippet 사용하기

이쯤 코딩을 하다보면, 반복되는 코드들이 자주 나오고 있음을 알 수 있다!  
이 때, 반복되는 코드들을 매번 치기 귀찮기 때문에 스니펫을 설정해주면 더욱 편하게 작업이 가능하다!

1. VSC에서 `Shift + Command + P`를 입력한다!

2. 위에 뜬 콘솔창에 user snippet 을 입력하고, javascript를 찾아 스니펫을 생성한다

3. 그 안에서 단축어를 적용한다

   ```json
   {
   	"for-loop": {
   		"prefix": "fl",
   		"body": [
   			"",
   			"for (let i = 0; i < $0.length; i++) { ",
   			"    $0[i].",
   			" }",
   			""
   		],
   	}
   }
   ```

   위와 같은 식으로 등록을 해둔다면, fl을 입력했을 때 미리 정의해둔 for문 형식이 똑 등장하는것!

## 5) 라우팅 폴더 정리하기

지금까지는 user.js 파일에서 모든 라우터를 관리해줬는데, 이걸 폴더화 시키는게 좋다! (유지보수를 위해!)

user라는 폴더를 만들고, 그 안에 각각의 라우터들을 파일로 만들어준다.
![image](https://user-images.githubusercontent.com/49263163/142233053-86ce87ff-687b-4671-92e2-7d15a20b2fd6.png)

### 예시코드들

```javascript
// /user/signup/index.js

const express = require("express");
const router = express.Router();

router.post("/signup", require("./userSignupPOST"));
router.post("/login", require("./userLoginPOST"));

module.exports = router;

```

```javascript
// /user/signup/userLoginPOST.js

const util = require("../../lib/util");
const responseMessage = require("../../constants/responseMessage");
const statusCode = require("../../constants/statusCode");
const users = require("./../../dbMockup/user");

module.exports = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));

  const user = users.filter((user) => user.email === email)[0];
  const data = {
    id: user.id,
    email: user.email,
    name: user.name,
  };
  if (!user) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
  }

  if (user.password !== password) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, responseMessage.MISS_MATCH_PW));
  }

  res
    .status(statusCode.OK)
    .send(util.success(statusCode.OK, responseMessage.LOGIN_SUCCESS, data));
};
```

# 3. Firebase Cloud Function

## 1) Firebase

- Firebase와 express 프로젝트와 연결하는 작업을 해본다!
- 구글에서 제공하는 Backend as a Service! 쉽고 싸고 간편하다!

## 2) Firebase 세팅 및 설명

### 2)-1 세팅하기

1. `npm install -g firebase-tools` 명령어로 firebase-tools를 설치한다
2. `firebase login` 을 해서 로그인을 해준다
3. 비어있는 경로에서 firebase init을 해준다
   디테일한 세팅으로는 functions - Use an existing project - 이전에 생성한 Firebase 프로젝트 선택 - Javascript - eslint 설치 - install dependencies with npm 
4. functions/ 디렉토리에서 `npm i express cors cookie-parser dotenv hpp helmet eslint-config-prettier` 명령어를 사용하여 모듈을 설치

### 2)-2 Firebase 설명

- **firebase.json** : firebase 설정파일로 거의 손댈 일은 없다. function을 세세하게 설정할때 더 사용한다.

- **firebaserc** : firebase 프로젝트 관련 설정 파일. 이 파일도 건드릴 일이 없다

- **functions/index.js** : entry point. 여기서 모든 코드가 출발한다.

  ```javascript
  // admin 권한을 갖고 function을 실행할 수 있게 해주는 코드
  const admin = require("firebase-admin");
  // admin 권한을 얻기위해 사용하는 비밀번호 역할을 하는 파일을 가져오는 코드
  const serviceAccount = require("./we-sopt-29-firebase-adminsdk-xs1o9-0bc9bc55ea");
  // 외부에 노출되면 안되는 환경변수를 관리하는 .env 파일을 가져오는 코드
  const dotenv = require("dotenv");
  
  dotenv.config();
  
  let firebase;
  if (admin.apps.length === 0) {
    firebase = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } else {
    firebase = admin.app();
  }
  
  module.exports = {
    api: require("./api"),
  };
  ```
  

### 2)-3 serviceAccount 생성

1. 생성한 firebase 프로젝트로 들어가서, project setting
2. service account - generate new private key를 해준다
3. 다운받은 파일을 index.js 파일이 있는 디렉토리에 옮겨주고, index.js에서 import 해준다.
4. 해당 파일이 github에 올라가지 않도록 gitignore에서 꼭 선언해준다!

