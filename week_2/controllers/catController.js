'use strict';
// catController

const catModel = require("../models/catModel");
// const cats = catModel.cats;

const getAllCats = async (req, res) => {
    const cats = await catModel.getAllCats(res);
  res.json(cats);
  };


const getCat = async (req, res) => {
    const cat = await catModel.getCatById(res, req.params.catId);
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