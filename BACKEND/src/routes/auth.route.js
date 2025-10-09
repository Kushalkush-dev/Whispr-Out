import express from "express";

const router=express.Router()

router.get("/signup",(req,res)=>{
  res.send("This is SIGNUP Route")
})


router.get("/login",((req,res)=>{
  res.send("This is Login Route")
}))


router.get("/logout",((req,res)=>{
  res.send("This is LOGOUT Route")
}))



export default router;