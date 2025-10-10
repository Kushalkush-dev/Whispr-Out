import express from "express";
import { signup } from "../controllers/auth.controller.js";

const router=express.Router()

router.post("/signup",signup)


router.get("/login",((req,res)=>{
  res.send("This is Login Route")
}))


router.get("/logout",((req,res)=>{
  res.send("This is LOGOUT Route")
}))



export default router;