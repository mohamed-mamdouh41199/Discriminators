const express = require('express');
const userController = require('../controller/controller.user');
const router = express.Router();

router.post('/create', userController.createUser);
router.get('/users', userController.getAllUsers);
router.get('/users/:role', userController.getRoleUser);

module.exports = router;
