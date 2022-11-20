'use strict';
const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
app.use(cors());
app.use(express.json()); // for parsing application json
app.use(express.urlencoded({extended : true}));

const catRouter = require('./routes/catRoute')
app.use('/cat', catRouter);

const userRouter = require('./routes/userRouter')
app.use('/user', userRouter);

//serve upload files
app.use(express.static('uploads'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

