import mongoose from  "mongoose";



const connectDB=async()=>{
try {

  const {MONGODB_URI}=process.env
  if(!MONGODB_URI) throw new Error("MONGODB URI NOT FOUND IN ENV")

  const connect=await mongoose.connect(process.env.MONGODB_URI)
  console.log("MONGOBD CONNECTED SUCCESSFULLY",connect.connection.host);
  
} catch (error) {
  console.error("MONGODB CONNECTION FAILED",error);
  process.exit(0);
  
}
}


export default connectDB;