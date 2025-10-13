import express from "express";
import { signup , login, logout, profiepic } from "../controllers/auth.controller.js";
import { protectRoutes } from "../middlewares/auth.middleware.js/protectRoutes.js";

const router=express.Router()

router.post("/signup",signup)


router.post("/login",login)


router.post("/logout",logout)


router.put("/updateprofile",protectRoutes,profiepic)

router.get("/check",protectRoutes,(req,res)=>{
  res.status(200).json(req.user)
})

export default router;