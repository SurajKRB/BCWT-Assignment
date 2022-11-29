"use strict";
// catController

const catModel = require("../models/catModel");
const { validationResult } = require("express-validator");
const {makeThumbnail} = require('../utils/image');

const getAllCats = async (req, res) => {
  const cats = await catModel.getAllCats(res);
  res.json(cats);
};

const getCat = async (req, res) => {
  const cat = await catModel.getCatById(res, req.params.catId);
  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

const createCat = async (req, res) => {
  const errors = validationResult(req);
  if (!req.file) {
    res.status(400).json({ message: "file missing or invalid"});
  } else if (errors.isEmpty()) {
    // making thumbnails
    await makeThumbnail(req.file.path, req.file.filename);
    // TODO: use image.js/getcoord to extract exif-data/gps coords and add
    // to the catObject as catObjest.coords property 

    console.log("creating a new cat: ", req.body);
    const newCat = req.body;
    newCat.owner = req.user.user_id;
    newCat.filename = req.file.filename;
    const result = await catModel.addCat(newCat);
    res.status(201).json({ message: "cat created", newCatId: result });
  } else {
    res
      .status(400)
      .json({ message: "cat creation failed", errors: errors.array() });
  }
};

const deleteCat = async (req, res) => {
  const result = await catModel.deleteCatById(res, req.params.catId, req.user.user_id);
  console.log("cat deleted", result);
  if (result.affectedRows > 0) {
    res.json({ message: "cat deleted" });
  } else {
    res.status(401).json({ message: "cat delete failed" });
  }
};

const modifyCat = async (req, res) => {
  const cat = req.body;
  if (req.params.catId) {
    cat.id = req.params.catId;
  }
  const result = await catModel.updateCatById(cat,req.user.user_id, res);
  if (result.affectedRows > 0) {
    res.json({ message: "cat modified", catId: cat.id });
  } else {
    res
      .status(404)
      .json({ message: "Cat Modify Failed" });
  }
};

module.exports = {
  getAllCats,
  getCat,
  createCat,
  deleteCat,
  modifyCat,
};
