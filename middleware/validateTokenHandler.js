const asyncHandler=require('express-async-handler');
const jwt=require('jsonwebtoken');
//middleware to validate token
const validateToken=asyncHandler(async(req,res,next)=>{
    let token;
    const authHeader=req.headers.authorization||req.headers.Authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        try{
            token=authHeader.split(" ")[1]; //get token from header
            //verify token
            const decoded=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);    
            console.log("Decoded user is:",decoded);
            req.user=decoded.user;
            next();
        }   catch(error){
            console.error(error);
            res.status(401);
            throw new Error("Not authorized, token failed");
        }   
    }
    if(!token){
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});
module.exports=validateToken;
