import jwt from "jsonwebtoken";
import ENV from "./env.js";
import "dotenv/config"

const generateToken=(userId,res)=>{


  const {JWT_SECRET_KEY}=ENV
  if(!JWT_SECRET_KEY)throw new Error("JWT SECRETKEY NOT FOUND IN ENV")
  

  const token =jwt.sign({userId:userId},ENV.JWT_SECRET_KEY,{
    expiresIn:"7d",
  })

  if(token){
    res.cookie("jwt",token,{
      maxAge:7*24*60*60*1000,
      httpOnly:true,
      sameSite:"strict",
      secure:process.env.NODE_ENV==="development"?false:true
    })
  }

return token
}


export default generateToken