'use strict';
// catRoute
const express = require('express');
const router = express.Router();
const multer = require('multer');
const {body} = require('express-validator');
const catController = require('../controllers/catController');

const file_filter = (req, file, cb) =>{
    const acceptedFileType = ['image/jpeg','image/png','image/gif'];
    if(acceptedFileType.includes(file.mimetype)){
        cb(null, true);
    } else{
        cb(null, false);
    }

}
const upload = multer({dest: 'uploads/', fileFilter: file_filter});


router.get('/', catController.getAllCats)
    .get('/:catId', catController.getCat)
    .post('/',
        upload.single('cat'),
        body('name').isAlphanumeric(),
        body('birthdate').isDate(),
        body('weight').isFloat({min: 0.1, max: 30}),
        body('owner').isInt({min:1}),
        catController.createCat)
    .delete('/:catId', catController.deleteCat)
    
    .put('/',catController.modifyCat)
    .put('/:catId',catController.modifyCat);
    


module.exports = router;