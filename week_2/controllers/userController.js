'use strict';
// userController

const userModel = require("../models/userModel");
const users = userModel.users;

const getAllUsers = (req, res) => {
    users.map(haha => {
        delete haha.password;
        return haha;
    });
    res.json(users);
  };

const getUser = (req, res) => {
    const user = users.filter(user => req.params.userId == user.id)[0];
    if(user){
        delete user.password;
        res.json(user);
    } else{
        res.sendStatus(404);
    }
  };


  const createUser = (req, res)=>{

        const userInfo = `username: ${req.body.name}, email: ${req.body.email}, password: ${req.body.password}`;
        res.send('Adding new user: '+ userInfo);
  };





module.exports = {
    getAllUsers,
    getUser,
    createUser
};