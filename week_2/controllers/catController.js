'use strict';
// catController

const catModel = require("../models/catModel");
const {validationResult} = require('express-validator');

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
        
        const errors = validationResult(req);
        if(errors.isEmpty() && req.file){
          console.log("creating a new cat: ", req.body);
          const newCat = req.body;
          newCat.filename = req.file.filename;
          const result = await catModel.addCat(newCat);
          res.status(201).json({message: 'cat created', newCatId: result});

        } else{
          res.status(400).json({message: 'cat creation failed', errors: errors.array()});
        }
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

  const modifyCat = async (req, res) => {
    const cat = req.body;
    if(req.params.catId){
      cat.id = req.params.catId;
    }
    const result = await catModel.updateCatById(cat, res);
    if(result.affectedRows>0){
      res.json({message: 'cat modified', catId: cat.id});
    } else{
      res.status(404).json({message: 'There doesnot exist any cat with this ID'});
    }
  };


module.exports = {
    getAllCats,
    getCat,
    createCat,
    deleteCat,
    modifyCat
};