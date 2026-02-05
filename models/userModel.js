const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please enter a username"],
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:[true,"Email already exists"],
    },
    password:{
        type:String,
        required:[true,"Please enter a password"],
    },
    timestamp:{
        type:Date,
        default:Date.now,
    },
});
module.exports=mongoose.model("User",userSchema);