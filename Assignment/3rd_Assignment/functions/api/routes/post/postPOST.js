const util = require('../../../lib/util');
const responseMessage = require('../../../constants/responseMessage');
const statusCode = require('../../../constants/statusCode');
const poisting = require('../../../dbMockup/poisting');

/* 
POST post
METHOD : POST
URI : localhost:3000/post
REQUEST BODY :  title, content
RESPONSE STATUS : 200 (OK)
RESPONSE DATA : id에 해당하는 poisting  정보
*/

module.exports = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  }

  data = {
    id: poisting.length + 1,
    title,
    content,
  };

  res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.POST_POST, data));
};
