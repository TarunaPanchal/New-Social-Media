var mongoose = require('mongoose');

var registerSchema = mongoose.Schema({
    name: { type: String, require: true },

    email: { type: String, unique: true, require: true },

    password: { type: String, require: true },
    bio:{type: String , default :" "},
    nickname : {type: String, default :" "},
    address : {type: String, default :" "},


    friends: [{
        _id: { type: String },
        name: { type: String }
    }],

    notification: [{
        _id: { type: String },
        name: { type: String }
    }],
    
    posts: [{
        post: { type: String },
        createdTime: { type: Date, default: Date.now }
    }]

});

module.exports = mongoose.model("registers", registerSchema);