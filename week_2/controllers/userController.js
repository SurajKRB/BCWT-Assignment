'use strict';
// userController

const userModel = require("../models/userModel");
const {validationResult} = require('express-validator');


const getAllUsers = async (req, res) => {
    const users = await userModel.getAllUsers(res);
res.json(users);
};


const getUser = async (req, res) => {
    const user = await userModel.getUserById(res, req.params.userId);
    if(user){
        res.json(user);
    } else{
        res.sendStatus(404);
    }
  };


const createUser = async(req, res)=>{
    console.log("creating a new user: ", req.body);
    const newUser = req.body;
    if (!newUser.role){
      //default user role
      newUser.role = 1;
    }
    const errors = validationResult(req);
    console.log('error: ',errors);

    if(errors.isEmpty()){
      const result = await userModel.addUser(newUser);
      res.status(201).json({message: 'user created', newUserId: result});
    } else{
      res.status(400).json({message: 'user creation failed', errors: errors.array()});
    }
  };


  const deleteUser = async(req, res)=>{
    const result = await userModel.deleteUserById(res, req.params.userId  );
    console.log('user deleted', result);
    if(result.affectedRows>0){
        res.json({message: 'user deleted'});
      } else{
        res.status(404).json({message: 'user was already deleted'});
      }
};


const modifyUser = async(req, res)=>{
  const user = req.body;
  if(req.params.userId){
    user.id = req.params.userId;
  }
  const result = await userModel.updateUserById(user, res);
  if(result.affectedRows>0){
    res.json({message: 'user modified', userId: user.id});
  } else{
    res.status(404).json({message: 'There doesnot exist any user with this ID'});
  }
  };

  const checkToken = (req, res)=>{
    delete req.user.password;
    res.json({user: req.user});
  };

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    modifyUser,
    deleteUser,
    checkToken
};