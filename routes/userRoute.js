const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//No authentication here (as requested)

// Create a new user
router.post('/users', userController.createUser);

// Login
router.post('/login', userController.login);


module.exports = router;
