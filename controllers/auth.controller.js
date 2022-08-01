const bcrypt = require('bcryptjs');

const { createAccessToken } = require('../services/token.service');
const {
  findOneByEmail,
  createOne,
} = require('../repositories/user.repository');

// register route
const singUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const gettedUser = await findOneByEmail(email);
    if (gettedUser !== null) {
      return res.status(400).json({
        msg: 'User exist with such email address, try other!',
      });
    }

    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt());

    const user = await createOne(name, email, hashedPassword);

    const token = createAccessToken(user.id, user.email);

    return res.status(201).json({
      msg: 'User successfully signed up!',
      id: user.id,
      name: user.name,
      email: user.email,
      token: token,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Internal Error 500, try again later!',
      err: err.message,
    });
  }
};

const singIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findOneByEmail(email);
    if (user === null) {
      return res.status(400).json({
        msg: 'Invalid email or password, try again!',
      });
    }

    const comparedPass = await bcrypt.compare(password, user.password);
    if (!comparedPass) {
      return res.status(400).json({
        msg: 'Invalid email or password, try again!',
      });
    }

    const token = createAccessToken(user.id, user.email);

    return res.status(201).json({
      msg: 'User successfully signed in!',
      id: user.id,
      name: user.name,
      email: user.email,
      token: token,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Internal Error 500',
      err: err.message,
    });
  }
};

module.exports = {
  singUp,
  singIn,
};