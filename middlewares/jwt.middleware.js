const { ResponseCodes } = require('../constants/response-codes');
const { validateToken } = require('../services/token.service');

function validatingAuthorization(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    const isHeaderNotSpecified =
      authHeader === undefined ||
      authHeader === null ||
      authHeader.length === 0;
    if (isHeaderNotSpecified) {
      return res.status(ResponseCodes.ERROR.NOT_AUTHORIZED).json({
        msg: 'You are not authorized to perform this action, please sing in and try again!',
      });
    }

    const token = authHeader.split(' ').pop();

    // checking if token exist
    if (!token) {
      return res.status(ResponseCodes.ERROR.NOT_AUTHORIZED).json({
        msg: 'You are not authorized to perform this action, please sing in and try again!',
      });
    }

    const decodedToken = validateToken(token);
    req.user = decodedToken; // we specified user obj to token data (email, id)

    next();
  } catch (err) {
    // if token is invalid
    return res.status(ResponseCodes.ERROR.NOT_AUTHORIZED).json({
      msg: 'You are not authorized to perform this action, please sing in and try again!',
    });
  }
}

module.exports = {
  validatingAuthorization,
};
