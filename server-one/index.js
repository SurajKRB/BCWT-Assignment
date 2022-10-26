'use strict';

const express = require('express');
const app = express();
const port = 3000;
var number =0;8

app.use(express.static('public'));
app.set('view engine', 'pug');

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
    // example using pug
    res.render('test',{
      title:"Pug page",
      header1:"This is Pug page",
      header2:"Counter",
      exampletext: "Page requested "+ number +" times."
    });
    
    
    //basic html as string
    //res.send('<h1> Test page </h1> <p> '+ number +'</p>')
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});