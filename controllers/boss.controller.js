const { AVALIABLE_COUNT_OF_BOSSES } = require('../constants/boss.constants');
const userRepository = require('../repositories/user.repository');
const bossRepository = require('../repositories/boss.repository');
const bossService = require('../services/boss.service');

async function getAvailableBosses(req, res) {
  try {
    const { id } = req.user; // decoded token data

    const user = await userRepository.findOneById(id);
    if (user === null) {
      return res.status(404).json({
        msg: 'No such user, try again!',
      });
    }

    const availableBosses = await bossRepository.checkForAvaliableBosses(id);
    if (availableBosses.length === 0) {
      return res.status(404).json({
        msg: "You don't have subordinated bosses!",
      });
    }

    return res.status(200).json({
      msg: 'Successfully got available bosses!',
      data: availableBosses,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Internal Error 500',
      err: err.message,
    });
  }
}

async function changeUserBoss(req, res) {
  try {
    const { id } = req.user; // decoded token data
    const { userId, newBossId } = req.body;

    /**
     * checking if user got from decoded token exist
     */
    const user = await userRepository.findOneById(id);
    if (user === null) {
      return res.status(404).json({
        msg: 'No such user, try again!',
      });
    }

    /**
     * checking for available bosses under user which made request
     */
    const availableBosses = await bossRepository.checkForAvaliableBosses(id);
    if (availableBosses.length === 0) {
      return res.status(404).json({
        msg: "You don't have subordinated bosses!",
      });
    }

    /**
     * checking if count of available bosses is more than 1,
     * because if it is lower than 1,
     * so i think, than u cannot change boss, because u have only one boss
     */
    if (availableBosses.length <= AVALIABLE_COUNT_OF_BOSSES) {
      return res.status(404).json({
        msg: `You only have one subordinated boss, so, unfortunately, this action is forbidden for you, you need more than ${AVALIABLE_COUNT_OF_BOSSES} subordinated bosses!`,
      });
    }

    /**
     * checking for if got boss_id from (req) is under the current boss (current boss - id of user, which makes req. get from token)
     */
    const isBossAtAvaliableBosses =
      bossService.checkIfBossExistAtAvailableBosses(newBossId, availableBosses);
    if (!isBossAtAvaliableBosses) {
      return res.status(404).json({
        msg: "You didn't have such boss at your subordinates, try again!",
      });
    }

    /**
     * checking if user which came from req (user_id) exists in db
     */
    const selectedUser = await userRepository.findOneById(userId);
    if (selectedUser === null) {
      return res.status(404).json({
        msg: 'User you selected - not exist, choose other user and try again!',
      });
    }

    /**
     * checking if selected user (from req.) is under current boss(token, who makes req.) bosses subordinates,
     * because it can be other user, which is not subordinates
     */
    const isUserAtBosses = await bossService.checkIfBossExistAtAvailableBosses(
      selectedUser.b_id,
      availableBosses,
    );
    if (!isUserAtBosses) {
      return res.status(404).json({
        msg: `No such user at your subordinates bosses, choose other user and try again!`,
      });
    }

    // here we change user and boss
    await bossRepository.changeUserBoss(userId, newBossId);

    // one again get list of boss and all subordinates
    const updatedListOfAvailableBosses =
      await bossRepository.findBossAndAllSubordinates(id);

    return res.status(200).json({
      msg: "Successfully changed user's boss!",
      data: updatedListOfAvailableBosses,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Internal Error 500',
      err: err.message,
    });
  }
}

module.exports = {
  getAvailableBosses,
  changeUserBoss,
};
