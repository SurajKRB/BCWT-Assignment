'use strict';
// userRoute
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {body} = require('express-validator');


router.get('/', userController.getAllUsers)
    .get('/:userId', userController.getUser)
    .post('/',
    body('name').isLength({min: 3}).trim().escape(), 
    body('email').isEmail().normalizeEmail(), 
    body('passwd').isLength({min: 8}).trim(),
    userController.createUser)
    .delete('/:userId', userController.deleteUser)
    
    .put('/',
        body('name').isLength({min: 3}).trim().escape(), 
        body('email').isEmail().normalizeEmail(), 
        body('passwd').isLength({min: 8}).trim(),
        userController.modifyUser)
    .put('/:userId',
        body('name').isLength({min: 3}).trim().escape(), 
        body('email').isEmail().normalizeEmail(), 
        body('passwd').isLength({min: 8}).trim(),
        userController.modifyUser);

module.exports = router;