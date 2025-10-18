import {create} from "zustand"

const useChatStore=create((set,get)=>({

  isContactsLoading:false,
  ischatPartnersLoading:false,
  activeTab:"chats",
  selectedUser:"",

  allContacts:[],
  chatPartners:[],
  
  isSoundEnabled:localStorage.getItem("soundEnabled")==="true",


  toggleSound:()=>{
    set({isSoundEnabled: !get().isSoundEnabled})
    localStorage.setItem("soundEnabled",isSoundEnabled)
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

}))



export default useChatStore