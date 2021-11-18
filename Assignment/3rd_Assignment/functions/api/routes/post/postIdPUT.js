const util = require('../../../lib/util');
const responseMessage = require('../../../constants/responseMessage');
const statusCode = require('../../../constants/statusCode');
const poisting = require('../../../dbMockup/poisting');

/* 
edit post
METHOD : PUT
URI : localhost:3000/post
REQUEST BODY :  title, content
RESPONSE STATUS : 200 (OK)
RESPONSE DATA : id에 해당하는 poisting  수정
*/

module.exports = async (req, res) => {
  const { id } = req.params;
  const { newTitle, newContent } = req.body;

  if (!id || !newTitle || !newContent) {
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  }

  const existingPost = poisting.filter((obj) => obj.id === +id)[0];

  if (!existingPost) {
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_POST));
  }
  const updatedPost = { ...existingPost, title: newTitle, content: newContent };

  res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.UPDATE_POST, updatedPost));
};
