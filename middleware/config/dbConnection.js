const mongoose=require('mongoose');
const connectDB=async()=>{
    try{
        const connect=await mongoose.connect(process.env.CONNECTION_STRING);  
        //console.log("MongoDB connected successfully");
        console.log(`MongoDB connected to ${connect.connection.host}, database: ${connect.connection.name}`);
    }catch(error){
        console.log(`MongoDB connection failed: ${error.message}`);
        process.exit(1);
    }
};
module.exports=connectDB;