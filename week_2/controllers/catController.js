'use strict';
// catController

const catModel = require("../models/catModel");
const cats = catModel.cats;

const getAllCats = (req, res) => {
    res.json(cats);
  };

const getCat = (req, res) => {
    const cat = cats.filter(cat => req.params.catId == cat.id)[0];
    if(cat){
        res.json(cat);
    } else{
        res.sendStatus(404);
    }
  };

  const createCat = (req, res) => {
    console.log(res)
    res.send('adding a cat');
  };





module.exports = {
    getAllCats,
    getCat,
    createCat
};