const express = require('express');
const logger = require('morgan');


const usersRouter = require('./routes/users');

const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use('/user', usersRouter);


app.listen(1234, function()
{
    console.log('running on 1234');
})

module.exports = app;
