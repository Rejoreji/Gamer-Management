const mongoose = require("mongoose")
const  schema = new mongoose.Schema({
    
    first_name:{
        type:String,
        required:true,
    },
    last_name:{
        type:String,
        required:true,
    },
    department:{
        type:String,
       
    },
    request_status:{
        type:String,
        
    },
    
})

const Userdb = mongoose.model('accessUser',schema);
module.exports=Userdb;
