const { UserRoles } = require('../constants/user-roles.constant');
const {
  findOneById,
  findAllUsers,
  findBossAndAllSubordinates,
} = require('../repositories/user.repository');

async function getUserInfoByIdAndRole(id, role) {
  let data;

  if (role === UserRoles.ADMIN) {
    data = await findAllUsers();
  }

  if (role === UserRoles.BOSS) {
    data = await findBossAndAllSubordinates(id);
  }

  if (role === UserRoles.USER) {
    data = await findOneById(id);
  }

  return data;
}

module.exports = {
  getUserInfoByIdAndRole,
};