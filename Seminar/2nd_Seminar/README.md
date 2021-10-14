# 2nd Seminar

![image](https://user-images.githubusercontent.com/49263163/136764245-5d153a4e-b1d5-4ce0-bfc8-e23d90249daa.png)

# 1. 비동기 흐름제어

## 1) 동기 비동기

### 동기 (Synchronous) 

작업에 대한 요청이 발생하면, 해당 요청에 대한 응답이 완료될 때까지 기다리는 방식.   
응답을 받으면 작업을 다시 시작한다. 

### 비동기 (Asynchronous)

요청이 들어오면, 응답이 올 때까지 다른 작업을 하고 있다가, 응답을 받으면 다시 처리하는 방식

## 2) JS에서 비동기 처리방법

JS 비동기식 처리 방법에는 세가지 방법이 있다.  
**Callback Function**, **Promise**, **Async/Await**

### 2)-1. Callback Function (콜백함수)

함수는 1급객체이기 때문에 다른 함수의 인자로 전달할 수 있는데, 이를 콜백함수라고 한다.    
일반적으로, 특정한 조건에 도달했을때 호출하는 식으로 사용한다.  
하지만 만약 제어할 함수의 양이 많아지게 되면, 콜백함수안에 콜백함수를 넣는 함수가 많아지게되고...   
소위 '콜백지옥'이라 불리는 이런 경우에는, 가독성이 매우 안좋고 코드를 이해하기도 굉장히 어렵다.  
이런 콜백지옥을 벗어나기위해 탄생한 것이 바로바로

### 2)-2 Promise

Promise는 3가지 상태를 가진다.

- **pending**
  - 최초 생성된 시점의 상태
  - new Promise() 메소드를 호출할때 콜백함수를 선언할 수 있는데,  
    동작에 대한 결과를 제대로 낼 수 있으면 resolve, 실패한 경우에는 reject 함수를 호출한다.

- **fulfilled**

  - 작업이 성공적으로 완료된 상태

  - 콜백함수에서 정의한 resolve(첫번째 인자)는 promise가 fullfilled 될 때 실행되는 인자이다.   
    'fullfilled가 될 때 이 값을 반환해라!'라는 뜻.   
     `.then()`을 사용해주면 , then이후의 매개변수 (resolvedData)로 resolve의 결과값이 넘어간다.

    즉, if문을 통과하면 `resolve()`에 값이 담기고 then 이후 매개변수로 들어간다.  
    .then 블록 안에서 매개변수로 활용할 수 있게 된 것!

- **rejected**

  - 작업이 실패한 상태
  - 이걸 활용하면 에러 핸들링을 할 수 있다.    
    실패된 에러는 rejected에 담겨, `.catch()`를 통해 전달된다.

  resolve와 then, reject와 catch가 각각 한 쌍이라고 생각하면 된다.

```javascript
// promise 예제! 

const promise = new Promise(function (resolve, reject) {
  const age = 25;
  if (age > 20) {
    resolve(age);
  } else {
    reject(new Error("나이가 너무 어립니다"));
  }
});

promise
  // Fulfilled일 시 값 : resolve()안에 있으며, .then()으로 전달
  .then((resolvedData) => {
    console.log(resolvedData);
  })
  // Rejected일 시 값 : reject()안에 있으며, .catch()로 전달
  .catch((err) => {
    console.log(err);
  });
```

- **Promise Chaining**
  - 여러개의 프로미스를 연결해서 사용하는 것을 Promise Chaining이라고 한다.  
  - `.then()` 과 `.catch()`의 활용으로, 앞서 설명했던 Callback Function의 콜백 지옥을 벗어나 깔끔하게 코딩을 할 수 가 있다.
  - `.then()` : 비동기 작업 완료시, 결과에 따라 함수 호출
  - `.catch()` : 체이닝 형태로 연결된 상태에서, 비동기 작업 중간에 에러가 났을 때 호출

- **Require?**
  - import와 비슷한 의미이다.
  - 다른 파일,  모듈에 있는 내용을 변수에 저장한다고 생각하면 된다.  
  - `module.exports` : export 되는 모듈로 취급하겠다는 의미.  
    이걸 쓰면 다른 파일에서, `require("")`코드를 사용해 해당 모듈을 쓸 수 있다.  

### 2)-3 async & await

promise가 콜백 보다 낫긴하지만, Promise Chaining이 복잡해지면 생각보다 직관적이지 않은 경우가 많다.  
그렇게 때문에, 이거를 좀 더 깔끔하게 만들어주는게 바로 **async & await**이다!  
내부적으로 promise와 원리가 똑같지만, 코드적으로 봤을때 이해하기가 좋고 가독성이 좋기에 대부분의 경우 async, await을 사용한다. 

- **Async**
  - Promise를 사용하지 않고, 효과적으로 callback을 해결한다.
  - async는 무조건 promise를 반환한다.
- **Await**
  - promise를 (promise가 resolve 되거나 reject 되기를) 기다릴 때 사용한다. 

```javascript
// async-await을 사용하는 방법

// promise를 반환하는 두개의 함수. resolve시 '함수이름 : 인자'를 반환한다
let asyncFunc1 = (msg) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`func1: ${msg}`);
    }, 1000);
  });
};

let asyncFunc2 = (msg) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`func2: ${msg}`);
    }, 2000);
  });
};

// Async & Await 표현식
const asyncMain = async () => {
  let result = await asyncFunc2("Hello");
  console.log(result);

  result = await asyncFunc2("world");
  console.log(result);
};

asyncMain();

```

# 2. 모듈

## 1) 모듈이란?

- 독립된 기능을 하는 함수나 변수들의 집합
- `module.exports` : export 되는 모듈로 취급하겠다는 의미.  
  이걸 쓰면 다른 파일에서, `require("")`코드를 사용해 해당 모듈을 쓸 수 있다.  

### exports 예시

```javascript
function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
const calculator = {
  add,
  subtract,
};

module.exports = calculator;
```

### require 예시

```javascript
const calculator = require("./calculator");

const addResult = calculator.add(1, 3);
const subtractResult = calculator.subtract(1, 3);

console.log(
  "result : ",
  addResult,
  subtractResult,
);
```

## 2) crypto 모듈을 사용한 암호화

- crypto : 문자열을 암호화, 복호화, hashing하는 모듈
- Hashing : 복호화 할 수 없는 암호화 방식 (단방향 암호화)  -> 한 문자열을 고정된 길이의 다른 문자열로 바꿔줌
- Salt : 암호화 중 해싱을 할 때 사용하는 임의의 문자열. DB에 salt와 password를 같이 저장해줘야한다
- Ket Stretching : 해싱을 반복적으로 하는 암호화 방식. 해싱된 암호를 다시 입력값으로 넣어 또 해싱한다.

### 2)-1 crypto 사용

```javascript
const crypto = require("crypto");

const password = "qwerty"; // 기존 비밀번호
const hex = crypto.createHash("sha512").update(password).digest("hex"); 
// crypto 모듈을 활용해 암호화한 비밀번호.
```

- `createHash()`
  md5, sha256, sha512 등의 알고리즘 입력. (주로 sha512 사용).
  해시 값을 반환한다.
- `update()`
  변환할 문자열을 입력한다
- `digest()`
  base64, hex 등의 인고딩 알고리즘을 입력한다.

### 2)-2 비밀번호를 저장하는 네가지 방법

1. **단순 텍스트**
   - 단순 텍스트로 패스워드를 저장하는 것은 범죄와 같다!
2. **Hashing**
   - 입력 받은 암호를 해싱하여 저장.
   - avalanche 효과 ( 입력값에 미세한 변화만 있어도 출력값이 크게 변함 -> 보안 굳!)
   - rainbow attack에 취약. (흔한 비밀번호에 대한 해시값들을 리스트로 저장해두고 그 값을 이용해 무작위 공격)
3. **Hashing with Salt**
   - 패스워드에 '소금'을 쳐서 암호화한다
   - Salt(임의의 문자열)을 추가해서 해싱하니 더욱 보안이 좋아진다!
4. **Ket Stretching**
   - '패스워드에 '소금'을 쳐서 암호화' 한걸 n번 실행한다.

### 2)-3 pbkdf2

비밀번호 암호화에서 사용하는 알고리즘
crypto에 내장되어있기에   
`crypto.pbkdf2 (비번, 솔트 값, 반복 횟수, 출력 byte, 해시 알고리즘, callback)` 로 사용하면 된다!

## 3) File System 모듈

파일 시스템에 접근해서 파일 생성, 삭제, 읽기, 쓰기를 할 수 있는 모듈.

- **비동기 방식**
  - Promise를 지원하지 않아 callback을 사용한다.
  - `readFile(path, [option], callback)`
  - `writeFile(file, data, [option], callback)`

- **동기 방식**
  - `readFileSync(path, [options])`
  - `writeFileSync(file, data, [options])`

**그런데!! 우리는 위의 crypto와 fs 모듈을 사용하지 않는다!!**  
왜냐하면?! 
비밀번호를 직접 암호화 하는 것보다 Firebase의 Authentication 서비스를 활용하는 것이 훨씬 더 간단하고, 
fs로 파일을 읽는 것보다 Firebase의 Firestore 서비스를 이용하는 것이 더 유연하기 때문이다!

# 3. Express

## 1) Express란?

서버를 구성하게 될때, 우리가 서버를 구성하는 작업을 편리하게 해주는 라이브러리!

## 2) Express 프로젝트 생성하기

1. `npm install express -g` : express라는 모듈을 전역으로 설치한다는 명령어  
   전역으로 설치하는 이유는, 어떤 경로에서든 express 명령어를 사용하기 위함! 

2. `npm install -g express-generator` : Express 프로젝트 생성기인 express-generator를 전역으로 설치하는 명령어
3. `express <프로젝트이름> ` : 입력한 이름을 가진 express 프로젝트를 생성하는 명령어
   프로젝트를 생성하고 싶은 디렉토리에서 해당 명령어를 사용하면,  원하는 디렉토리에 express 프로젝트가 생성된다.

## 3) Express 구조

### 3)-1 bin/www

- 확장자는 js가 아니지만, js파일이다. 
- `var app = require('../app');` : app을 import함
- `http`  : http 라는 고정적인 모듈을 사용해서 서버를 띄워준다는 의미
- `var port = normalizePort(process.env.PORT || '3000');`
  port 번호를 지정해준다.  process.env.PORT는 추후 설명할 예정.  
  지금은 3000 포트를 사용한다는 뜻.
- app을 import하고, http 모듈로 서버를 띄우고, port를 정의한다. 
  이 express의 과정만 이해하면 되고, www 파일은 거의 손 댈일이 없다.

### 3)-2 public/

- `public/`은 각종 리소스를 포함하는 폴더.   
  뷰에서 사용되는 이미지, js, stylesheets를 쓰기 위해 존재하는 폴더!
- 그런데 우리는 express로 서버만 띄울것이기 때문에, 필요가 없다! (`views/`도 마찬가지! 얘네들은 프론트 붙일때만 사용! )

### 3)-3 🔥 routes/ 🔥 (제일 중요한 폴더!!)

- 페이지 라우팅과 관련된 파일들을 저장하는 폴더. 주소 별로 라우터들을 모아둔다. 
- URL 별로 실행되는 실제 서버 로직
- index.js를 시작으로 관리해주면 된다!

### 3)-4 app.js

- express가 실행되는 starting point라고 생각하면 된다!
- `const app = express();` : app이라는 변수에 express의 모든 것을 담아준다. 여기서부터 express의 시작!
- `app.set()` : set은 설정을 변경할 때 사용하는 명령어이다. (하지만 우리는 거의 안쓸 것)
- `app.use()` : use는 middleware 를 사용할 때 쓰는 것. (우리가 제일 많이 사용할 예정!)
- `module.exports = app;` :   
  app.js에서 export 되는 app이라는 객체는 express 를 담고 있다. (`app = express()`)  
  현재 express는  위에 잔뜩 use 해놓은 미들웨어들을 적용한 상태이다.  
  이처럼 다양한 미들웨어가 적용된 express가 export 되고  
  이게 /bin/www 에서 import되어 서버를 띄우는 것!

### 3)-5 package.json

- dependencies라고 하는 것의 모음집!  즉 우리가 사용하는 모듈들을 정리해놓은 파일이다.  
- 목록에 정리된 모듈들은 `node_modules`에 저장되어 있음
- `node_modules`은 굉장히 무겁기 때문에 항상 가지고 있지 않는다. (git-hub에 올라가지 않는다는 의미)  
  .gitignore 를 사용해서 github에 올라가지 않도록 해준다.
- 로컬에서는 `package.json`의 명세대로 모듈들을 설치하여 사용한다. 
- 설치할 때는 `npm install`, 새로운 모듈을 설치할 때는 `npm install 모듈이름` 명령어를 사용
- `"start": "node ./bin/www"` : 
  js 파일을 실행할때, 우리는 `node 뭐시기`명령어를 사용해왔다.  
  우리는 앞으로 사용할 `node ./bin/www` 명령어를 package.json에 "start"라는 스크립트로 정의해놨다.  
  그렇기 때문에 앞으로 해당 파일을 실행 할 때는 ,`npm start`라는 명령어로 `bin/www`를 실행하게 된다!

### 3)-6 Express 프로젝트 실행하기

- 프로젝트 최상위에서 `npm install`로 모듈을 설치
- 이후 같은 경로에서 `npm start`를 해주면 express가 시작된다!
- 브라우저에서 `localhost:포트번호`로 접속하면 성공 여부를 확인할 수 있다.

## 4) Express 페이지 라우팅

### 4)-1 라우팅이란?? 

URI(또는 경로) 및 특정한 HTTP 요청 메소드 (GET, POST 등)에 애플리케이션이 응답하는 방법을 결정하는 것!   
우리는 `/routes` 폴더로 이들을 관리할 예정!

### 4)-2 라우팅 하기

1. 폴더를 생성하고, 해당 폴더에 `index.js`를 생성한다.(폴더에 접근할 때는 반드시 index.js가 있어야 한다!)

2. 그 index.js 파일에 내부 로직을 생성한다. (routes/api/index.js)

   ```javascript
   const express = require("express"); // express 모듈 불러오기
   const router = express.Router;  // Router() 미들웨어 불러오기
   
   // router를 사용해서, 라우팅을 정의한다.
   // Get method로 api/ 요청이 들어온다면 (req,res) 함수로 대응하겠다는 의미
   // get에서는 "/"인데 왜 api/ 요청이냐?? -> api 폴더 안에있기 때문!
   router.get("/", (req, res) => {
     const result = {
       // 해당 로직을 실행한다
       status: 200,
       message: "api~!",
     };
     res.status(200), send(result);
   });
   
   module.exports = router; // 생성한 router 객체를 모듈로 반환한다.
   ```

3. 라우터 상위 폴더인 routes의 index.js 에서 `router.use()`를 사용하여, 앞서서 생성한 폴더의 index.js로 접근한다. 

   ```javascript
   router.use("/api", require("./api"));
   ```

   - 모든 라우터들은 middleware라고 생각하면 된다.  
     그렇게 생성된  middleware를 경로에 맞게 use 해주는 것!

### 4)-3 폴더 vs 파일

우리는 위에서 폴더를 사용한 라우팅을 해보았는데, 사실 파일도 방법은 똑같다! 

엥? 여기서 궁금한점?!!!  
만약 우리가 blog.js 라는 라우팅 파일을 만들었다고 했을때, 
왜 폴더를 사용하는 방식과 똑같이 `router.use("/blog", require("./blog"));` 로 해줄 수 있는걸까?!  
`router.use("/blog", require("./blog.js"));` 해줘야 하는거 아님??!  

--> 사실 blog.js 로 해도 상관없다. **확장자를 제거한 이유는 그것이 폴더일수도, 파일일 수도 있기 때문!**    
파일일 경우에는 blog.js를 import 해주고 만약 blog가 파일이 아닌 폴더일 경우에는 blog 폴더안에 있는 index.js를 무조건 import 해주게 된다.

