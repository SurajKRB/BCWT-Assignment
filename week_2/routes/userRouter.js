'use strict';
// userRoute
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.get('/', userController.getAllUsers)
    .get('/:userId', userController.getUser)
    .post('/', userController.createUser)
    .delete('/:userId', userController.deleteUser)
    
    .put('/',userController.modifyUser)
    .put('/:userId',userController.modifyUser);

module.exports = router;