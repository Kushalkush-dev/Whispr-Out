import e from "express";
import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const rateLimit=async(req,res,next)=>{

  try {
    const decision=await aj.protect(req);
    if(decision.isDenied()){
      if(decision.reason.isRateLimit()){
        return res.status(429).json({message:"Too many Request - Limit Reached"})
      }else if(decision.reason.isBot()){
        return res.status(403).json({message:"BOT Identified Access Denied"})
      }else{
        return res.status(403).json({message:"Access Denied By Security Policy"})

      }
    }

    if(decision.results.some(isSpoofedBot)){
      res.status(403).json({error:"Spoofeed Bot Detected",
                            message:"Malicious bot Activity Detected"})
    }
    next()

  } catch (error) {
    console.log("ArcJet Protection Error",error)
    next()
  }

  
}