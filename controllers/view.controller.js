const { ResponseCodes } = require('../constants/response-codes');
const userRepository = require('../repositories/user.repository');
const userServise = require('../services/user.service');

async function getUsers(req, res) {
  try {
    const { id } = req.user; // decoded token data

    const user = await userRepository.findOneById(id);
    if (user === null) {
      return res.status(ResponseCodes.ERROR.NOT_FOUND).json({
        msg: 'No such user, try again!',
      });
    }

    const users = await userServise.getUserInfoByIdAndRole(id, user.role);

    return res.status(ResponseCodes.SUCCESS.OK).json({
      msg: 'Users successfully got!',
      data: users,
    });
  } catch (err) {
    console.error('Error occurred at /view/users, err: ', err);
    return res.status(ResponseCodes.SERVER.INTERNAL_ERROR).json({
      message: 'Internal Server Error, try again!',
    });
  }
}

module.exports = {
  getUsers,
};
