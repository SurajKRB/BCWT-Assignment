'use strict';
const express = require('express');
const app = express();
const port = 3000;
const catRouter = require('./routes/catRoute')
app.use('/cat', catRouter);

const userRouter = require('./routes/userRouter')
app.use('/user', userRouter);


app.listen(port, () => console.log(`Example app listening on port ${port}!`));

