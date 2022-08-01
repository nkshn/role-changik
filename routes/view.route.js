const { Router } = require('express');
const viewController = require('../controllers/view.controller');

const router = Router();

router.get('/users', viewController.getUsers);

module.exports = router;
