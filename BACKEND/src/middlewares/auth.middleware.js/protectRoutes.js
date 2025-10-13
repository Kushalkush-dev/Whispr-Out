import ENV from "../../lib/env.js";
import User from "../../Models/user.model.js";
import jwt from "jsonwebtoken";

export const protectRoutes=async (req,res,next)=>{
  try {
    const token=req.cookies.jwttoken;
    if(!token) return res.status(401).json({message:"Token not Found"})


      let isVerifiedUser;
    try {
      isVerifiedUser= jwt.verify(token,ENV.JWT_SECRET_KEY)
     // if(!isVerifiedUser)return res.status(401).json({message:"Unauthorised JWT Token"})
      
    } catch (error) {
      return res.status(401).json({message:"Unauthorised or Invalid Token"})
    }


      const isUser=await User.findById(isVerifiedUser.userId).select("-password")

      if(!isUser)return res.status(404).json({message:"User Not Found"})

       req.user=isUser;
    
       next()
  } catch (error) {
    console.error("Error in protectRoutes middleware")
    res.status(500).json({message:"INTERNAL SERVER ERROR"})
  }
}