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

  const createCat = async(req, res) => {
    console.log("creating a new cat: ", req.body);
        const newCat = req.body;
        newCat.filename = req.file.filename;
        const result = await catModel.addCat(newCat);
        res.status(201).json({newCatId: result});
  };

  const deleteCat = async(req, res) => {
    const result = await catModel.deleteCatById(res, req.params.catId );
    console.log('cat deleted', result);
    if(result.affectedRows>0){
      res.json({message: 'cat deleted'});
    } else{
      res.status(404).json({message: 'cat was already deleted'});
    }
  };



module.exports = {
    getAllCats,
    getCat,
    createCat,
    deleteCat
};