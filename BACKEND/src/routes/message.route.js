import express from "express"
import { chatPage, getAllContacts, getMessages, sendMessage } from "../controllers/message.controller.js"
import { protectRoutes } from "../middlewares/auth.middleware.js/protectRoutes.js"
import { rateLimit } from "../middlewares/rateLimit.js"

const router=express.Router()


router.use(rateLimit,protectRoutes)

router.get('/contacts',getAllContacts)
router.get('/chat',chatPage)
router.get("/getmessages/:id",getMessages)
router.post("/send/:id",sendMessage)


export default router
