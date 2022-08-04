const bcrypt = require('bcryptjs');
const tokenServise = require('../services/token.service');
const userRepository = require('../repositories/user.repository');
const { ResponseCodes } = require('../constants/response-codes');

// register route
async function singUp(req, res) {
  try {
    const { name, email, password } = req.body;

    const gotUser = await findOneByEmail(email);
    if (gotUser !== null) {
      return res.status(ResponseCodes.ERROR.INVALID_DATA).json({
        msg: 'User exist with such email address, try other!',
      });
    }

    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt());

    const user = await userRepository.createOne(name, email, hashedPassword);

    const token = tokenServise.createAccessToken(user.id, user.email);

    return res.status(ResponseCodes.SUCCESS.USER_CREATED).json({
      msg: 'User successfully signed up!',
      id: user.id,
      name: user.name,
      email: user.email,
      token: token,
    });
  } catch (err) {
    console.error('Error occurred at /auth/signup, err: ', err);
    return res.status(ResponseCodes.SERVER.INTERNAL_ERROR).json({
      message: 'Internal Server Error, try again!',
    });
  }
}

async function singIn(req, res) {
  try {
    const { email, password } = req.body;

    const user = await userRepository.findOneByEmail(email);
    if (user === null) {
      return res.status(ResponseCodes.ERROR.INVALID_DATA).json({
        msg: 'Invalid email or password, try again!',
      });
    }

    const comparedPass = await bcrypt.compare(password, user.password);
    if (!comparedPass) {
      return res.status(ResponseCodes.ERROR.INVALID_DATA).json({
        msg: 'Invalid email or password, try again!',
      });
    }

    const token = tokenServise.createAccessToken(user.id, user.email);

    return res.status(ResponseCodes.SUCCESS.OK).json({
      msg: 'User successfully signed in!',
      id: user.id,
      name: user.name,
      email: user.email,
      token: token,
    });
  } catch (err) {
    console.error('Error occurred at /auth/signin, err: ', err);
    return res.status(ResponseCodes.SERVER.INTERNAL_ERROR).json({
      message: 'Internal Server Error, try again!',
    });
  }
}

module.exports = {
  singUp,
  singIn,
};
