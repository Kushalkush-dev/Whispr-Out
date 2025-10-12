import { resend ,sender } from "../lib/resend.js";
import  createWelcomeEmailTemplate from "../emails/emailTemplate.js"
import dotenv from "dotenv/config"


export const sendWelcomeEmail=async(email,name,clientURL)=>{
  const {data,error}=await resend.emails.send({

    from:`${sender.name} <${sender.email}>`,
    to:email,
    subject:"Welcome to WhisprOut! 🎉",
    html:createWelcomeEmailTemplate(name,clientURL)

  });


  if(error){
    console.log("Error sending welcome email:", error);
    throw new Error("Failed to send welcome email");
  }

  console.log("Welcome email sent successfully:", data);
  }
