var express = require('express');
var app = express();
var db = require('./db');
var user = require('./userController');

app.use(express.json());

app.use('/user', user);


var PORT = 4000;
app.listen(PORT, () => {
    console.log('server running on ', PORT);
})

module.exports = app;