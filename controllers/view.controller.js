async function getUsers(req, res) {
  const { id, email } = req.user; // decoded token data

  return res.status(200).json({
    msg: 'This is view users route!',
    data: [
      {
        userId: id,
        userEmai: email,
      },
    ],
  });
}

module.exports = {
  getUsers,
};
