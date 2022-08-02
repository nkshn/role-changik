const { findOneById } = require('../repositories/user.repository');
const { getUserInfoByIdAndRole } = require('../services/user.service');

async function getUsers(req, res) {
  try {
    const { id } = req.user; // decoded token data

    const user = await findOneById(id);
    if (user === null) {
      return res.status(404).json({
        msg: 'No such user, try again!',
      });
    }

    const users = await getUserInfoByIdAndRole(id, user.role);

    return res.status(200).json({
      msg: 'Users successfully getted!',
      data: users,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Internal Error 500',
      err: err.message,
    });
  }
}

module.exports = {
  getUsers,
};
