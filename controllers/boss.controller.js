async function getAvailableBosses(req, res) {
  try {
    return res.status(200).json({
      msg: 'Successfully getted available bosses!',
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
    return res.status(200).json({
      msg: 'Successfully changed user boss!',
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
