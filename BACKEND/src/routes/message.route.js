import express from "express"
import { chatPage, getAllContacts, getMessages, sendMessage } from "../controllers/message.controller.js"
import { protectRoutes } from "../middlewares/auth.middleware.js/protectRoutes.js"

const router=express.Router()




router.get('/contacts',protectRoutes,getAllContacts)
router.get('/chat',protectRoutes,chatPage)
router.get("/getmessages/:id",protectRoutes,getMessages)
router.post("/send/:id",protectRoutes,sendMessage)

// router.get('/send',(req,res)=>{
//   res.send("This message send Route")
// })



// router.get('/receive',(req,res)=>{
//   res.send("This message receive Route")
// })
export default router
