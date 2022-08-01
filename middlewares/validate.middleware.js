const { check, validationResult } = require('express-validator');

const { formatingErrorsArray } = require('../utils/formating');

const authInputs = [
  check('name')
    .not()
    .isEmpty()
    .withMessage({ msg: 'Enter your name, name cannot be empty, try again!' })
    .bail(),
  check('email')
    .not()
    .isEmpty()
    .withMessage({
      msg: 'Enter your email, email cannot be empty, try again!',
    })
    .bail()
    .isEmail()
    .withMessage({
      msg: 'Email entered with invalid format, try again!',
    })
    .bail()
    .normalizeEmail(),
  check('password')
    .not()
    .isEmpty()
    .withMessage({
      msg: 'Enter password!',
    })
    .bail()
    .isLength({ min: 8 })
    .withMessage({
      msg: 'Password must be more than 8 characters, try again!',
    })
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        msg: 'Incorrect inputs, please try again!',
        errors: formatingErrorsArray(errors.array()),
      });
    }
    next();
  },
];

module.exports = {
  authInputs,
};
