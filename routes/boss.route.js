const { Router } = require('express');
const bossController = require('../controllers/boss.controller');
const jwtMiddleware = require('../middlewares/jwt.middleware');

const router = Router();

router.get(
  '/available',
  jwtMiddleware.validatingAuthorization,
  bossController.getAvailableBosses,
);

router.post(
  '/change',
  jwtMiddleware.validatingAuthorization,
  bossController.changeUserBoss,
);

module.exports = router;
