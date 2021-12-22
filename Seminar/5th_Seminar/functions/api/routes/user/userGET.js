const functions = require('firebase-functions');
const util = require('../../../lib/util');
const responseMessage = require('../../../constants/responseMessage');
const statusCode = require('../../../constants/statusCode');
const db = require('../../../db/db');
const { userDB, postDB } = require('../../../db');

/* 
get profile
METHOD : GET
URI : localhost:3000/user/profile/:id
REQUEST BODY :  password, email
RESPONSE STATUS : 200 (OK)
RESPONSE DATA : 비밀번호를 제외한 User 정보
*/

module.exports = async (req, res) => {
  const { userId } = req.params;

  // request params가 잘못됐을 때
  if (!userId) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));

  let client;

  try {
    client = await db.connect(req);
    const user = await userDB.getUserById(client, userId);
    if (!user) return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, responseMessage.NO_USER));

    const posts = await postDB.getPostsByUserId(client, userId);

    res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.READ_ONE_USER_SUCCESS, { user,posts }));
  } catch (error) {
    functions.logger.error(`[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] ${error}`);
    console.log(error);

    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
  } finally {
    client.release();
  }
};
