const mongoose=require('mongoose');
const contactSchema=mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    name:{
        type:String,
        required:[true,"Please enter a name"],
    },
    email:{
        type:String,
        required:true,
        unique:[true,"Email already exists"],
    },
    phone:{
        type:String,
        required:[true,"Please enter a phone number"],
        unique:true,
    },
   Timestamp:{
        type:Date,
        default:Date.now,
   },
});

module.exports=mongoose.model("Contact",contactSchema);
