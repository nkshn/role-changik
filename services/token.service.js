const jwt = require('jsonwebtoken');

function createAccessToken(id, email) {
  const token = jwt.sign(
    {
      id: id,
      email: email,
    },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRATION_TIME,
    },
  );

  return token;
}

function validateToken(token) {
  const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  return decoded;
}

module.exports = {
  createAccessToken,
  validateToken,
};
