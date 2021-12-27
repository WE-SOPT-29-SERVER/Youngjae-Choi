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
    if (needToIssueAccessToken === true) {
      const { newAccessToken } = jwtHandlers.sign(user);
      user = { ...user, newAccessToken };
    }

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
