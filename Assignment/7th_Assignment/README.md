# 7rd Seminar Assignment :fire::fire::fire:

![image](https://user-images.githubusercontent.com/49263163/147310815-26c6c783-ad5f-40dc-8e38-1b1b05949310.png)

---

# Level 2 

<img width="650" alt="Screen Shot 2021-12-24 at 12 36 43 PM" src="https://user-images.githubusercontent.com/49263163/147313375-53fbdfbf-95aa-4548-b10e-63c832347007.png">

firebase 의 bucket!  
firebase-storage-resize-images extensions를 사용하여, 리사이징 된 이미지들은   
`/resized` 폴더에 저장되도록 해주었다🔥



## before resized

![20211224_025435_608039327114](https://user-images.githubusercontent.com/49263163/147313379-54f86e9e-6270-4d65-a607-c0886f580bfb.jpeg)

## after resized



![resized_20211224_025435_608039327114_200x200](https://user-images.githubusercontent.com/49263163/147313381-3c51c193-d0cf-4aa0-835e-d368764bdb20.jpeg)





# Level 3 

## Refresh Token???!

기존의 Access Token 을 활용한 인증은, 제 3자에게 탈취될 경우 보안에 취약하다는 큰 단점이 있다.  
이를 위해 Access Token 의 유효 기간을 짧게 만들고, 유효기간 이 더 긴 Refresh Token을 추가적으로 발급해줌으로써, 
기존의 Access Token만 사용하는 방식보다 훨씬 보안성을 강화한 방법이다. 

## 시나리오 및 로직

1. 로그인 시 Access Token과 Refresh Token을 동시에 발급한다. 
   - 이 때, Refresh Token은 DB에 저장해준다.
2. 인증이 필요한 API에서 토큰을 검증하는 middleware를 거치면, 다양한 경우에 따라 토큰을 핸들링한다.
   - case1. access token과 refresh token 전부다 만료된 경우 -> err return
   - case2. access token 만료, refresh token 유효한 경우 -> access token 재발급
   - case3. access token 유효, refresh token 만료된 경유 -> refresh token 재발급
   - case4. access token, refresh token 전부 유효 -> 다음 미들웨어로 
3. 로그아웃 시 Access Token과 Refresh Token을 전부 만료/삭제시킨다.

## /middleware/auth.js

상황에 따라 token을 handling하는 방법이 다양하겠지만,  
우선 임의의 상황을 가정하고, 무지성으로 handling 해보았읍니다.. 호호...

```javascript
const functions = require('firebase-functions');
const jwtHandlers = require('../lib/jwtHandlers');
const db = require('../db/db');
const util = require('../lib/util');
const statusCode = require('../constants/statusCode');
const responseMessage = require('../constants/responseMessage');
const { userDB } = require('../db');
const { TOKEN_INVALID, TOKEN_EXPIRED } = require('../constants/jwt');

const checkUser = async (req, res, next) => {
  // request headers에 accesstoken과 refreshtoken이라는 이름으로 담긴 값(jwt)을 가져옵니다.
  const { accesstoken, refreshtoken } = req.headers;

  // accesstoken이 없을 시의 에러 처리입니다.
  if (!accesstoken) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.TOKEN_EMPTY));

  let client;
  try {
    client = await db.connect(req);
    let decodedRefreshToken = null;
    let needToIssueAccessToken = false;
    let needToIssueRefreshToken = false;
    let userId;

    // jwt를 해독하고 인증 절차를 거칩니다.
    const decodedAccessToken = jwtHandlers.verify(accesstoken);
    if (refreshtoken !== null) {
      decodedRefreshToken = jwtHandlers.verify(refreshtoken);
    }
    // access token 과 refresh token이 전부 유효하지 않은 경우
    if (decodedAccessToken === TOKEN_INVALID || decodedRefreshToken === TOKEN_INVALID)
      return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.TOKEN_INVALID));

    // access token이 만료된 경우
    if (decodedAccessToken === TOKEN_EXPIRED) {
      // case1. access token 과 refresh token이 전부 만료된 경우
      if (decodedRefreshToken === TOKEN_EXPIRED) {
        return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.TOKEN_EXPIRED));
      }
      // case2. access token은 만료되었지만, refresh toke은 유효한 경우
      else if (decodedRefreshToken !== TOKEN_EXPIRED) {
        userId = decodedRefreshToken.id;
        // access token 발급해야함을 Check
        needToIssueAccessToken = true;
      }
    }
    // access token이 유효한 경우
    else {
      // 해독된 jwt에 담긴 id 값이 우리가 DB에서 찾고자 하는 user의 id입니다.
      userId = decodedAccessToken.id;
      // case3. access token은 유효하지만, refresh token은 만료된 경우
      if (decodedRefreshToken === TOKEN_EXPIRED) {
        // refresh token 발급해야함을 Check
        needToIssueRefreshToken = true;
      }
    }

    // 유저id가 없을 시의 에러 처리입니다.
    if (!userId) return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.TOKEN_INVALID));

    // 위의 id 값으로 유저를 조회합니다.
    let user = await userDB.getUserById(client, userId);

    // 유저가 없을 시의 에러 처리입니다.
    if (!user) return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.NO_USER));

    // 토큰 추가 발급 처리
    // 새로운 access token을 발급해주어야하는 경우, 
		// refresh token의 정보를 바탕으로 새로운 access token을 만들어 발급한다.
    if (needToIssueAccessToken === true) {
      const { newAccessToken } = jwtHandlers.sign(user);
      user = { ...user, newAccessToken };
    }
    
    // 새로운 refresh token을 발급해주어야하는 경우, 
		//  refresh token을 만들어 발급한 뒤, DB에 업데이트 해준다.
    if (needToIssueRefreshToken === true) {
      const { newRefreshToken } = jwtHandlers.refresh(user);
      let refreshtoken = await userDB.addRefreshToken(clent, userId, newRefreshToken);
    }

    // 유저를 찾았으면, req.user에 유저 객체를 담아서 next()를 이용해 다음 middleware로 보냅니다.
    // 다음 middleware는 req.user에 담긴 유저 정보를 활용할 수 있습니다.
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    functions.logger.error(`[AUTH ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, accesstoken);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
  } finally {
    client.release();
  }
};

module.exports = { checkUser };

```

[참고 사이트](https://cotak.tistory.com/102)

## 
