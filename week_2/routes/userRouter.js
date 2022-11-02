'use strict';
// userRoute
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.get('/', userController.getAllUsers);
  

router.get('/:userId', userController.getUser);

module.exports = router;