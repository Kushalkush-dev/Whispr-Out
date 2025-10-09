import express from "express"

const router=express.Router()



router.get('/send',(req,res)=>{
  res.send("This message send Route")
})



router.get('/receive',(req,res)=>{
  res.send("This message receive Route")
})
export default router