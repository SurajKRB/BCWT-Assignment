'use strict';
// userRoute
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {body} = require('express-validator');


router.get('/', userController.getAllUsers)
    .get('/:userId', userController.getUser)
    .post('/',
    body('name').isLength({min: 3}), 
    body('email').isEmail(), 
    body('passwd').isLength({min: 8}),
    userController.createUser)
    .delete('/:userId', userController.deleteUser)
    
    .put('/',userController.modifyUser)
    .put('/:userId',userController.modifyUser);

module.exports = router;