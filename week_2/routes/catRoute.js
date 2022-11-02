'use strict';
// catRoute
const express = require('express');
const router = express.Router();
const catController = require('../controllers/catController');


router.get('/', catController.getAllCats);
  

router.get('/:catId', catController.getCat);
  
  
router.post('/',(req,res)=>{
res.send('From this endpoint you can add cats.');
});

  
router.put('/',(req,res)=>{
res.send('From this endpoint you can edit cats.');
});

  
router.delete('/',(req,res)=>{
res.send('From this endpoint you can delete cats.');
});


module.exports = router;