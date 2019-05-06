var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/LinkedIn',{useNewUrlParser: true, useCreateIndex: true} )
    .then(()=>console.log("Database Created"))
    .catch(err=>console.error(err));


