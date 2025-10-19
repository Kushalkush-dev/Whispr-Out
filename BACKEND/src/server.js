import express from  'express';
import "dotenv/config"
import ENV  from "./lib/env.js"
import cookieParser from "cookie-parser"
import cors from "cors"


import authRoute from './routes/auth.route.js';
import messagesRoute from './routes/message.route.js'
 import path from 'path';
import connectDB from './lib/db.js'

const PORT=ENV.PORT || 3000;


const app=express();
app.use(express.json({limit:"10mb"}))
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors({
  origin:ENV.CLIENT_URL || "http://localhost:5173/",
  credentials:true
}))
app.use(cookieParser())
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
  await connectDB()
  console.log(`Server is running on port http://localhost:${PORT}`);
})