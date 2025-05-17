const express = require('express');
const userController = require('../controller/controller.user');
const router = express.Router();

router.post('/create', userController.createUser);
router.get('/get', userController.getUser);

module.exports = router;
