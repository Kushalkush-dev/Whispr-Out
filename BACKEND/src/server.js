import express from  'express';
import dotenv from "dotenv/config"

import authRoute from './routes/auth.route.js';
import messagesRoute from './routes/message.route.js'

const PORT=process.env.PORT || 3000



const app=express();


app.use("/api/auth",authRoute)

app.use("/api/message",messagesRoute)



app.listen(PORT,(req,res)=>{
  console.log(`Server is running on port http://localhost:3000`);
})