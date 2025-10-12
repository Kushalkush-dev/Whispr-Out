import mongoose from "mongoose";
import User from "../Models/user.model.js";
import bcrypt from "bcryptjs"
import generateToken from "../lib/util.js";
import e, { json } from "express";
import { sendWelcomeEmail } from "../emails/emailHandler.js";
import ENV from "../lib/env.js";

export const signup=async(req,res)=>{

const {fullname,email,password}=req.body;



try {
  
  if(!fullname || !email || !password){
    return res.status(400).json({message:"All fields are required"})
  }
  
  
  const emailRegex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if(!emailRegex.test(email)){
    return res.status(400).json({message:"Invaild Email Format"})
  
  }
  
  if(password.length<6){
    return res.status(400).json({message:"Password must be atleast 6 or more characters"})
  }

  const userExisting=await User.findOne({
    email:email
  })

  if(userExisting){
    return res.status(400).json({message:"User Already Exist"})
  }else{
    const salt=await bcrypt.genSalt(10)
  
    const hashpassword=await bcrypt.hash(password,salt)
  
  
  
  
      const newUser=new User({
        fullname,
        email,
        password:hashpassword
      })
  
      if(newUser){

        
        const savedUser= await newUser.save()
        generateToken(savedUser._id,res)
        res.status(201).json({
          _id:newUser._id,
          fullname:newUser.fullname,
          email:newUser.email,
          profiepic:newUser.profiepic,     
         })
         
  try {
   await sendWelcomeEmail(savedUser.email,savedUser.fullname,ENV.CLIENT_URL)
    
  } catch (error) {
    console.error("Error sending welcome email:", error);
    
  }
      }else{
        res.status(400).json({message:"Invalid User Data"})
      }

  }
  

  }catch(error){
  console.log("Error in Signup controller",error);
  res.status(500).json({message:"Internal Server Error"})
  
}







}



export const login=async (req,res)=>{
  const {email,password}=req.body;
try {
  const isUser= await User.findOne({
    email
  })

  if(!isUser) return res.status(400).json({message:"INVAILD CREDENTIALS"})

    const ispassword=await bcrypt.compare(password,isUser.password)

    if(!ispassword)return res.status(400).json({message:"INVAILD CREDENTIALS"})

    generateToken(isUser._id,res)

    res.status(200).json({
      _id:isUser._id,
      fullname:isUser.fullname,
      email:isUser.email,
      profiepic:isUser.profiepic,
    })
  
} catch (error) {
  console.log("LOGIN ERROR (LOGIN CONTROLLER",error);

  res.status(500).json({message:"INTERNAL SERVER ERROR"})
  
}



}


export const logout=async(_,res)=>{

  res.cookie("jwt","",{maxAge:0})
  res.status(400).json({message:"LOGGED OUT SUCCESSFULLY"})  

}