import jwt from "jsonwebtoken";

const generateToken=(userId,res)=>{


  const {JWT_SECRET_KEY}=process.env
  if(!JWT_SECRET_KEY)throw new Error("JWT SECRETKEY NOT FOUND IN ENV")
  

  const token =jwt.sign({userId:userId},process.env.JWT_SECRET_KEY,{
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