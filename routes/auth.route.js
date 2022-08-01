const { Router } = require('express');
const authController = require("../controllers/auth.controller");

const router = Router();

router.post('/singup', authController.singUp);
router.post('/singin', authController.singIn);

module.exports = router;
