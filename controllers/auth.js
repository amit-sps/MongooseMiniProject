const user=require("../models/user.model");
const validator=require("validator");
const jwt=require("jsonwebtoken");
require("dotenv").config()

exports.signup=async(req,res)=>{
    const {userName,Name,email,password}=req.body;
    try{
       if(!userName||!Name||!email||!password)
       return res.status(400).send("All field is required!")
       if(!validator.isEmail(email))
       return res.status(400).send("Invalid Email !");
       const newUser=new user({userName,Name,email,password});
       const theUser=await newUser.save();
       if(!theUser)
       return res.status(400).send("Something went wrong!");
       const token=await jwt.sign({_id:theUser._id},process.env.tokenkey);
       return res.status(200).json({user:theUser,token});
    }catch(err){
        console.log(err)
       const splitedError=err.message.split(" ");
       if(splitedError.indexOf("userName:")!=-1)
       return res.status(400).send(`The user Name ${userName} already exists!`);
       else if(splitedError.indexOf("email:")!=-1)
       return res.status(400).send(`The email ${email} already exists!`);
    }
}

exports.signin=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email||!password)
        return res.status(400).send("All field is required!")
        if(!validator.isEmail(email))
        return res.status(400).send("Invalid Email !");
        const theUser=await user.findOne({email});
        if(!theUser)
        return res.status(400).send("Invalid User !")
        if(theUser.password!==password)
        return res.status(400).send("Invalid User !")
        const token=await jwt.sign({_id:theUser._id},process.env.tokenkey);
        return res.status(200).json({user:theUser,token});
    }catch(err){
        return res.status(400).send("Invalid User !")
        console.log(err)
    }
}