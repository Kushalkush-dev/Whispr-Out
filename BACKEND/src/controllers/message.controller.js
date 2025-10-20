import cloudinary from "../lib/cloudinary.js";
import Message from "../Models/Message.model.js";
import User from "../Models/user.model.js"



export const getAllContacts=async(req,res)=>{

  try {
    const loggedInUser=req.user._id;
    const allContacts=await User.find({_id:{$ne:loggedInUser}}).select("-password");
    if(!allContacts) return res.status(400).json({message:"No Contacts Found"})

    res.status(200).json(allContacts);

    
  } catch (error) {
    console.log("Error in getAllContacts Controller",error);
    res.status(500).json({message:"Internal Server Error"})
    
    
  }

}


export const getMessages=async(req,res)=>{

  try {
    const myId=req.user._id;
    const {id:userToChatId}=req.params;
    
    const Messages=await Message.find({
      $or:[
        {senderId:myId,receiverId:userToChatId},
        {senderId:userToChatId,receiverId:myId}
      ]
    })
    if(!Messages)return res.status(404).json({message:"No Message Found"})
    res.status(200).json(Messages)
  } catch (error) {
    console.log("Error in getAllContacts Controller",error);
    res.status(500).json({message:"Internal Server Error"})
  }

  




}


export const sendMessage=async(req,res)=>{

  try {
    const senderId=req.user._id;
    const {text,image}=req.body
    const {id:receiverId}=req.params;

    if(!text && !image) return res.status(400).json({message:"Message is empty"})

      let ImageUrl;
      if(image){
        const Uploadresponse=await cloudinary.uploader.upload(image,{
          folder:"MessageImages"
        })
        if(!Uploadresponse) return res.status(500).json({message:"Error in uploading image to cloudinary"})
          ImageUrl=Uploadresponse.secure_url;
      }

      const newMessage=new Message({

        senderId,
        receiverId,
        text,
        image:ImageUrl

      })

      if(!newMessage)return res.status(500).json({message:"Error in Saving New Message"})
        await newMessage.save()

       res.status(201).json(newMessage);


  } catch (error) {
    console.log("Error in sendMessage Controller",error);
    res.status(500).json({message:"Internal Server Error"})
  }

}



export const chatPage=async(req,res)=>{
  try {
    const loggedInUser=req.user._id;
    const allMessage=await Message.find({
      $or:[
        {senderId:loggedInUser },
        {receiverId:loggedInUser}
      ]
    })
    if(!allMessage)return res.status(402).json("No Chats Found")
      

      const chatPartnerIds=[...new Set(
        allMessage.map((msg)=> 
          msg.senderId.toString()===loggedInUser.toString() ? msg.receiverId.toString(): msg.senderId.toString() )
        
      ) ];
      const Chatters=await User.find({_id:{$in:chatPartnerIds}}).select("-password");

      res.status(200.).json(Chatters)


  } catch (error) {
    console.log("Error in Chatpage controller")
    res.status(500).json({message:"Internal Server Error"})
  }

}