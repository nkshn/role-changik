const { Router } = require('express');
const viewController = require('../controllers/view.controller');
const jwtMiddleware = require('../middlewares/jwt.middleware');

const router = Router();

router.get('/users', jwtMiddleware.validatingAuthorization, viewController.getUsers);

module.exports = router;
