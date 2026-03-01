//bcript library used to hash the raw password which we will get from request body
const bcrypt=require("bcryptjs");
//when user login we need to give a successfull token to the user
const jwt=require("jsonwebtoken");
const User=require("../models/userModel");

//whenever we have request here we need to register the user
const register=async(req,res)=>
{
    try{
const {username,password,role}=req.body;
const hashedPassword=await bcrypt.hash(password,10);
const newUser=new User({username,password:hashedPassword,role});
await newUser.save();
res
    .status(201)
    .json({message:`user registered with username${username}`});
}catch(err)
{
    res.status(500).json({message:"something went wrong"});
}
};
//to login for getting the user
const login=async(req,res)=>
{ try{
const {username,password}=req.body;
const user=await User.findOne({username});
if(!user)
{
return res
    .status(404)
    .json({message:`user with username${username} not found`});
}
//if user found then compare the password
const isMatch=await bcrypt.compare(password,user.password);
if(!isMatch)
{
    //give the response back
    return res.status(400).json({message:`invalic credential`});
}
//if every this is well
//we r going to generate a token and give this token to response back to user
    const token =jwt.sign(
        {id:user._id,role:user.role}, //_id is automatically generated we record is gnerate in mongoDB
        process.env.JWT_SECRET,
        {expiresIn:"1h"} //we want to be token expire in 1hr
    );
    res.status(200).json({token}); //giving the response back
}
catch(err)
{
        res.status(500).json({message:"something went wrong"});

}

};
module.exports={
    register,
    login,
};
