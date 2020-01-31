var mongoose = require('mongoose');

var hospitalSchema = new mongoose.Schema({
    name: {type : String, required : true},
    email : {type : String, required : true},
    password : {type : String, required : true},
    role : {type : String, required : true},
    listoftreatment : {type : String , trim : true },
   
    location : {type : String , trim : true },
    beds : {type : String , trim : true },
   
});

var Hospital = mongoose.model('Hospital', hospitalSchema);

export default Hospital;