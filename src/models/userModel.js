var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: {type : String, required : true},
    email : {type : String, required : true},
    password : {type : String, required : true},
    role : {type : String, required : true},

    specialisation : {type : String , trim : true },
    listoftreatment : {type : String , trim : true },
    workexperience : {type : String , trim : true },
    qualification : {type : String , trim : true },
    awards : {type : String , trim : true },
    location : {type : String , trim : true },
    avgfees : {type : String , trim : true }
});

var User = mongoose.model('User', userSchema);

export default User;