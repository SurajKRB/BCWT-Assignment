'use strict';

const express = require('express');
const app = express();
const port = 3000;
var number =0;8

app.use(express.static('public'));

app.get('/catinfo', (req, res)=>{
  const cat = {
    name: "Shilpa",
    birthdate: "2000-1-1",
    weight: 5,
  };

  res.json(cat);
});

app.get('/test',(req, res) =>{
    console.log("hahaha")
    ++number
    res.send('<h1> Test page </h1> <p> '+ number +'</p>')
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});