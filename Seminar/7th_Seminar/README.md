# 5th Seminar

![image](https://user-images.githubusercontent.com/49263163/142656865-ea7083be-f9a1-4b78-90f0-8a4e3ea12234.png)

---

# 1.NodeJs 연동

## 1) dotenv

dotenv는 여러 중요한 환경변수들을 관리하고, github에 올리지 않도록 하기위해 사용한다.

### functions/.env

```
DB_USER = RDS유저네임
DB_HOST = RDS 엔드포인트
DB_DB = postgres
DB_PASSWORD = RDS 비밀번호
```

이렇게 .env에 선언된 변수들을

### functions/config/dbConfig.js

```javascript
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DB,
  password: process.env.DB_PASSWORD,
};
```

이런식으로 사용이 가능하다!

## 2) db

### 2)-1 functions/db/db.js

```javascript
// 필요한 모듈들
const functions = require('firebase-functions');
const { Pool, Query } = require('pg');
const dayjs = require('dayjs');
const dotenv = require('dotenv');
dotenv.config();

// DB Config (유저, 호스트, DB 이름, 패스워드)를 로딩해줍시다.
const dbConfig = require('../config/dbConfig');

// NODE_ENV라는 글로벌 환경변수를 사용해서, 현재 환경이 어떤 '모드'인지 판별해줍시다.
let devMode = process.env.NODE_ENV === 'development';

// SQL 쿼리문을 콘솔에 프린트할지 말지 결정해주는 변수를 선언합시다.
const sqlDebug = true;

// 기본 설정에서는 우리가 실행하게 되는 SQL 쿼리문이 콘솔에 찍히지 않기 때문에,
// pg 라이브러리 내부의 함수를 살짝 손봐서 SQL 쿼리문이 콘솔에 찍히게 만들어 줍시다.
const submit = Query.prototype.submit;
Query.prototype.submit = function () {
  const text = this.text;
  const values = this.values || [];
  const query = text.replace(/\$([0-9]+)/g, (m, v) => JSON.stringify(values[parseInt(v) - 1]));
  // devMode === true 이면서 sqlDebug === true일 때 SQL 쿼리문을 콘솔에 찍겠다는 분기입니다.
  devMode && sqlDebug && console.log(`\n\n[👻 SQL STATEMENT]\n${query}\n_________\n`);
  submit.apply(this, arguments);
};

// 서버가 실행되면 현재 환경이 개발 모드(로컬)인지 프로덕션 모드(배포)인지 콘솔에 찍어줍시다.
console.log(`[🔥DB] ${process.env.NODE_ENV}`);

// 커넥션 풀을 생성해줍니다.
const pool = new Pool({
  ...dbConfig,
  connectionTimeoutMillis: 60 * 1000,
  idleTimeoutMillis: 60 * 1000,
});

// 위에서 생성한 커넥션 풀에서 커넥션을 빌려오는 함수를 정의합니다.
// 기본적으로 제공되는 pool.connect()와 pool.connect().release() 함수에 디버깅용 메시지를 추가하는 작업입니다.
const connect = async (req) => {
  const now = dayjs();
  const string =
    !!req && !!req.method
      ? `[${req.method}] ${!!req.user ? `${req.user.id}` : ``} ${req.originalUrl}\n ${!!req.query && `query: ${JSON.stringify(req.query)}`} ${!!req.body && `body: ${JSON.stringify(req.body)}`} ${
          !!req.params && `params ${JSON.stringify(req.params)}`
        }`
      : `request 없음`;
  const callStack = new Error().stack;
  const client = await pool.connect();
  const query = client.query;
  const release = client.release;

  const releaseChecker = setTimeout(() => {
    devMode
      ? console.error('[ERROR] client connection이 15초 동안 릴리즈되지 않았습니다.', { callStack })
      : functions.logger.error('[ERROR] client connection이 15초 동안 릴리즈되지 않았습니다.', { callStack });
    devMode ? console.error(`마지막으로 실행된 쿼리문입니다. ${client.lastQuery}`) : functions.logger.error(`마지막으로 실행된 쿼리문입니다. ${client.lastQuery}`);
  }, 15 * 1000);

  client.query = (...args) => {
    client.lastQuery = args;
    return query.apply(client, args);
  };
  client.release = () => {
    clearTimeout(releaseChecker);
    const time = dayjs().diff(now, 'millisecond');
    if (time > 4000) {
      const message = `[RELEASE] in ${time} | ${string}`;
      devMode && console.log(message);
    }
    client.query = query;
    client.release = release;
    return release.apply(client);
  };
  return client;
};

module.exports = {
  connect,
};
```

###  2)-2 pool

pool이 뭐냐 ??  
db와의 연결을 만들어 둔 상태에서 pool이라는 걸 만든다.   
query가 실행이 끝날 때마다 db와의 연결을 끊는 것이 아니라, db와의 연결을 유지한 채 query가 실행될 때마다 pool에서  connection을 빌려왔다가 실행이 끝나면 release 하는 방식을 사용하게 된다.  
query가 실행될때마다 서버와의 연결을 껐다 킬 필요가 없어지는 것!  
