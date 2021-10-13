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

