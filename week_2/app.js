'use strict';
const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const passport = require('./utils/passport');

app.use(cors());
app.use(express.json()); // for parsing application json
app.use(express.urlencoded({extended : true}));
app.use(passport.initialize());

const catRouter = require('./routes/catRoute');
app.use('/cat', passport.authenticate('jwt', {session: false}), catRouter);

const userRouter = require('./routes/userRouter');
app.use('/user', passport.authenticate('jwt', {session: false}) ,userRouter);

const authRouter = require('./routes/authRoute');
app.use('/auth', authRouter);

//serve upload files
app.use(express.static('uploads'));
app.use('/thumbnails', express.static('thumbnails'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

