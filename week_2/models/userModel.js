'use strict';
// this is used to establish connection with the database
const pool = require("../database/db");
const promisePool = pool.promise();

const getAllUsers = async(res) =>{
  try{
    const [rows] = await promisePool.query("SELECT user_id, name, email, role FROM wop_user");
    return rows;
  } catch (e) {
      console.error("error", e.message);
      res.status(500).send(e.message);
  }
};


const getUserById = async (res, userId) => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner's name as ownername (from wop_user table).
    const [rows] = await promisePool.query("SELECT user_id, name, email, role FROM wop_user WHERE user_id = ?", [userId]);
    return rows[0];
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};


const addUser = async (userObject, res) => {
  try {
    const sql = "INSERT INTO wop_user VALUES (null, ?, ?, ?, ?)";
    const values = [userObject.name, userObject.email,userObject.passwd, userObject.role];
    const [result] = await promisePool.query(sql, values);
    return result.insertId;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};



const deleteUserById = async ( req, userId) => {
  try {
    const [rows] = await promisePool.query("DELETE FROM wop_user WHERE user_id = ?", [userId]);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};


const updateCUserById = async (catObject, res) => {
};



module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  deleteUserById,
  updateCUserById
};

