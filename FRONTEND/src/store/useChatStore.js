import {create} from "zustand"
import axiosClient from "../libs/axiosClient"
import toast from "react-hot-toast"

const useChatStore=create((set,get)=>({

  isContactsLoading:false,
  ischatPartnersLoading:false,
  activeTab:"chats",
  selectedUser:'',

  allContacts:[],
  chatPartners:[],

  Messages:[],

  MessagesLoading:false,


  
  isSoundEnabled:JSON.parse(localStorage.getItem("soundEnabled"))===true,


  toggleSound:()=>{
    localStorage.setItem("soundEnabled",!get().isSoundEnabled)
    set({isSoundEnabled: !get().isSoundEnabled})
  },

  toggleActiveTab:(tab)=>{
    set({activeTab:tab})
  },


  setSelectedUser:(user)=>set({selectedUser:user}),






  

   getContacts:async()=>{
    set({isContactsLoading:true})
    try {
      const res=await axiosClient.get("/message/contacts")
      set({allContacts:res.data})
    } catch (error) {
      console.log("Unable get Contacts",error)
    }finally{
       set({isContactsLoading:false})
    }
  },  


   getChatPartners:async()=>{
    set({ischatPartnersLoading:true})
    try {
      const res=await axiosClient.get("/message/chat")
      set({chatPartners:res.data})
    } catch (error) {
      console.log("Unable get Contacts",error)
    }finally{
       set({ischatPartnersLoading:false})
    }
  },  



  getMessageByUser:async(userToChatId)=>{

    set({MessagesLoading:true})

    try {
      const res=await axiosClient.get(`/message/getmessages/${userToChatId}`)

      set({Messages:res.data})
      
    } catch (error) { 
      console.log("Error fetching messages of the user");
      toast.error(error.response.data.message)

      
    }finally{
      set({MessagesLoading:false})
    }

  }


}))



export default useChatStore