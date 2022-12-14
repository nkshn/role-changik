const { Router } = require('express');
const authController = require('../controllers/auth.controller');
const validateMiddleware = require('../middlewares/validate.middleware');

const router = Router();

router.post('/singup', validateMiddleware.singUpInputs, authController.singUp);
router.post('/singin', validateMiddleware.singInInputs, authController.singIn);

module.exports = router;
