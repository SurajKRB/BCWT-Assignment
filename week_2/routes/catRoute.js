'use strict';
// catRoute
const express = require('express');
const router = express.Router();
const multer = require('multer');

const catController = require('../controllers/catController');

const upload = multer({dest: 'uploads/'});


router.get('/', catController.getAllCats)
    .get('/:catId', catController.getCat)
    .post('/', upload.single('cat'),catController.createCat)
    .delete('/:catId', catController.deleteCat)
    
    .put('/',catController.modifyCat)
    .put('/:catId',catController.modifyCat);
    


module.exports = router;