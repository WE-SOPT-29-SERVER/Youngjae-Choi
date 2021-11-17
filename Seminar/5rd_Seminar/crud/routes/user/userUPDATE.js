const util = require("../../lib/util");
const responseMessage = require("../../constants/responseMessage");
const statusCode = require("../../constants/statusCode");

const users = require("../../dbMockUp/user");

module.exports = async (req, res) => {
  const { id } = req.params;
  const { newName } = req.body;

  if (!id || !newName) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  }

  const user = users.filter((users) => users.id == Number(id))[0];

  if (!user) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
  }

  const updatedUser = { ...user, name: newName };

  res
    .status(statusCode.OK)
    .send(
      util.success(statusCode.OK, responseMessage.UPDATE_USER, updatedUser)
    );
};
