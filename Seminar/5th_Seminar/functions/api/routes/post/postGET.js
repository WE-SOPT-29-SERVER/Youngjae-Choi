const util = require('../../../lib/util');
const responseMessage = require('../../../constants/responseMessage');
const statusCode = require('../../../constants/statusCode');
const poisting = require('../../../dbMockup/poisting');

/* 
get poisting
METHOD : GET
URI : localhost:3000/post
REQUEST BODY :  
RESPONSE STATUS : 200 (OK)
RESPONSE DATA : 모든 poisting  정보
*/

module.exports = async (req, res) => {
  const data = poisting;

  res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.READ_ALL_POSTS, data));
};
