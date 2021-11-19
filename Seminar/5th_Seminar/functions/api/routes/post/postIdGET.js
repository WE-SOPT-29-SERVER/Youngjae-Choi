const util = require('../../../lib/util');
const responseMessage = require('../../../constants/responseMessage');
const statusCode = require('../../../constants/statusCode');
const poisting = require('../../../dbMockup/poisting');

/* 
get poisting
METHOD : GET
URI : localhost:3000/post/:id
REQUEST BODY :  
RESPONSE STATUS : 200 (OK)
RESPONSE DATA : id에 해당하는 poisting  정보
*/

module.exports = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.OUT_OF_VALUE));
  }

  const post = poisting.filter((obj) => obj.id === +id)[0];

  if (!post) {
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
  }

  const data = {
    id: post.id,
    title: post.title,
    content: post.content,
  };

  res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.READ_POST, data));
};
