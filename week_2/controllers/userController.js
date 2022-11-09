'use strict';
// userController

const userModel = require("../models/userModel");
//const users = userModel.users;


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
    const result = await userModel.addUser(newUser);
    res.status(201).json({newUserId: result});
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
    // TODO
  };


module.exports = {
    getAllUsers,
    getUser,
    createUser,
    modifyUser,
    deleteUser
};