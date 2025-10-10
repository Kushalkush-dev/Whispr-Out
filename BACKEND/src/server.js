import express from  'express';
import dotenv from "dotenv/config"


import authRoute from './routes/auth.route.js';
import messagesRoute from './routes/message.route.js'
 import path from 'path';
import connectDB from './lib/db.js'

const PORT=process.env.PORT || 3000


const app=express();

app.use(express.json())
const __dirname=path.resolve()


app.use("/api/auth",authRoute)

app.use("/api/message",messagesRoute)


if(process.env.NODE_ENV=="production"){

  app.use(express.static(path.join(__dirname,"../FRONTEND/dist")))

  app.get("*",(_,res)=>{
    res.sendFile(express.static(path.join(__dirname,"../FRONTEND","dist","index.html")))
  })
}




app.listen(PORT,async(req,res)=>{
  console.log(`Server is running on port http://localhost:${PORT}`);
  await connectDB()
})