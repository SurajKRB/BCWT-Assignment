'use strict';
// catRoute
const express = require('express')
const router = express.Router();


router.get('/', (req, res) => {
    res.send('From this endpoint you can get cats.')
  });
  

router.get('/:catId', (req, res) => {
console.log(req.params);
res.send('From this endpoint you can get cat with id '+req.params.catId);
});
  
  
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