const mongoose=require('mongoose');
var schema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    first_name:{
        type:String,
        required:true,
    },
    last_name:{
        type:String,
        required:true,
    },
    DOB:Date,
    access_type:{
        type:String,
        
    },
    department:{
        type:String,
       
    },
    phone_number:{
        type:String,
        
    },
    address:{
        type:String,
       
    }
    
})

const Userdb = mongoose.model('users',schema);
module.exports=Userdb;
