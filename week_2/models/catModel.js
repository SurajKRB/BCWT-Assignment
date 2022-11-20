"use strict";
const { request } = require("express");
const pool = require("../database/db");
const promisePool = pool.promise();

const getAllCats = async (res) => {
  try {
    const sql = 'select cat_id, wop_cat.name, weight, owner, filename, birthdate,wop_user.name as ownername '+
                  'from wop_cat inner join wop_user on wop_cat.owner=wop_user.user_id;'
    const [rows] = await promisePool.query(sql);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};


const getCatById = async (res, catId) => {
  try {
    const [rows] = await promisePool.query("SELECT * FROM wop_cat WHERE cat_id = ?", [catId]);
    return rows[0];
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

const addCat = async (catObject, res) => {
  try {
    const sql = "INSERT INTO wop_cat VALUES (null, ?, ?, ?, ?, ?)";
    const values = [catObject.name, catObject.weight,catObject.owner, catObject.filename, catObject.birthdate];
    const [result] = await promisePool.query(sql, values);
    return result.insertId;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};


const deleteCatById = async (req, catId) => {
  try {
    const [rows] = await promisePool.query("DELETE FROM wop_cat WHERE cat_id = ?", [catId]);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};


// Update the data (put) 
const updateCatById = async (catObject, res) => {
  try {
    const sql = 'UPDATE wop_cat SET name=?, weight=?, owner=?, birthdate=? WHERE cat_id=?';
    const values = [catObject.name, catObject.weight, catObject.owner, catObject.birthdate, catObject.id];
    const [rows] = await promisePool.query(sql, values);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};






module.exports = {
  getAllCats,
  getCatById,
  addCat,
  deleteCatById,
  updateCatById
};











/*

'use strict';
const cats = [
  {
    id: '1',
    name: 'Frank',
    birthdate: '2010-10-30',
    weight: '5',
    owner: '1',
    filename: 'http://placekitten.com/400/300',
  },
  {
    id: '2',
    name: 'James',
    birthdate: '2015-12-25',
    weight: '11',
    owner: '2',
    filename: 'http://placekitten.com/400/302',
  },
];

module.exports = {
  cats,
};
*/
