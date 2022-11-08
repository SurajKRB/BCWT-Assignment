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





module.exports = {
    getAllUsers,
    getUser,
    createUser
};