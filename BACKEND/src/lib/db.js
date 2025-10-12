import mongoose from  "mongoose";

import "dotenv/config"
import ENV from "./env.js";

const connectDB=async()=>{
try {

  const {MONGODB_URI}=ENV
  if(!MONGODB_URI) throw new Error("MONGODB URI NOT FOUND IN ENV")

  const connect=await mongoose.connect(MONGODB_URI)
  console.log("MONGOBD CONNECTED SUCCESSFULLY",connect.connection.host);
  
} catch (error) {
  console.error("MONGODB CONNECTION FAILED",error);
  process.exit(0);
  
}
}


export default connectDB;