const util = require('../../../lib/util');
const responseMessage = require('../../../constants/responseMessage');
const statusCode = require('../../../constants/statusCode');
const poisting = require('../../../dbMockup/poisting');

/* 
delete post
METHOD : DELETE
URI : localhost:3000/post
REQUEST BODY :  id
RESPONSE STATUS : 200 (OK)
RESPONSE DATA : id에 해당하는 poisting 삭제
*/

module.exports = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  }

  const existingPost = poisting.filter((obj) => obj.id === +id)[0];

  if (!existingPost) {
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_POST));
  }
  const newPost = poisting.filter((obj) => obj.id !== +id)[0];

  res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.DELETE_POST, newPost));
};
