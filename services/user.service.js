const { UserRoles } = require('../constants/user-roles.constant');
const userRepository = require('../repositories/user.repository');
const bossRepository = require('../repositories/boss.repository');

async function getUserInfoByIdAndRole(id, role) {
  let data;

  if (role === UserRoles.ADMIN) {
    data = await userRepository.findAllUsers();
  }

  if (role === UserRoles.BOSS) {
    data = await bossRepository.findBossAndAllSubordinates(id);
  }

  if (role === UserRoles.USER) {
    data = await userRepository.findOneById(id);
  }

  return data;
}

module.exports = {
  getUserInfoByIdAndRole,
};
