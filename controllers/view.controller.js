const { UserRoles } = require('../constants/user-roles.constant');
const {
  findOneById,
  findAllUsers,
} = require('../repositories/user.repository');

async function getUsers(req, res) {
  try {
    const { id } = req.user; // decoded token data

    const user = await findOneById(id);
    if (user === null) {
      return res.status(400).json({
        msg: 'No such user, try again!',
      });
    }

    let data = [];

    if (user.role === UserRoles.ADMIN) {
      data = await findAllUsers();
    }

    if (user.role === UserRoles.BOSS) {
      console.log('lets do this...!');
      data = [];
    }

    if (user.role === UserRoles.USER) {
      data = await findOneById(id);
    }

    console.log('user: ', user);

    return res.status(200).json({
      msg: 'Users successfully getted!',
      data: data,
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
