function checkIfBossExistAtAvailableBosses(bossId, availableBosses) {
  let result = false;

  for (const boss of availableBosses) {
    if (boss.id === bossId) {
      return true;
    }
  }

  return result;
}

module.exports = {
  checkIfBossExistAtAvailableBosses,
};
