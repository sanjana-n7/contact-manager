const asyncHandler=require('express-async-handler');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const User=require('../models/userModel');

//@desc register new user
//@route POST /api/users/register
//@access public
const registerUser=asyncHandler(async(req,res)=>{
    const{username,email,password}=req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userExists=await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error("User already exists");
    }
    //hash password
    const hashedPassword=await bcrypt.hash(password,10);
    console.log("Hashed password is:",hashedPassword);
    const user=await User.create({
        username,
        email,
        password:hashedPassword,
    });
    res.status(201).json({message:"User created successfully",user:user});
    if(user){
        res.status(201).json({ _id: user.id, email: user.email });  
    }
    else{
        res.status(400);
        throw new Error("User data is not valid");
    }
    res.json({message:"Register new user"});
});
//@desc login existing user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // 1️⃣ Check empty fields
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  // 2️⃣ Find user
  const user = await User.findOne({ email });

  // 3️⃣ Check password
  if (user && (await bcrypt.compare(password, user.password))) {

    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          id: user.id,
          email: user.email,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "59m" }
    );

    // 4️⃣ Send response (ONLY ONCE)
    res.status(200).json({
      message: "Login successful",
      accessToken,
    });

  } else {
    res.status(401);
    throw new Error("Email or password is not valid");
  }
});

//@desc current existing user
//@route POST /api/users/current
//@access private
const currentUser=asyncHandler(async(req,res)=>{
    res.json(req);
});
module.exports={registerUser,loginUser,currentUser};