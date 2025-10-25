import { create } from "zustand"
import axiosClient from "../libs/axiosClient"
import toast from "react-hot-toast"
import { useAuthStore } from "./useAuthStore"

const useChatStore = create((set, get) => ({

  isContactsLoading: false,
  ischatPartnersLoading: false,
  activeTab: "chats",
  selectedUser: '',

  allContacts: [],
  chatPartners: [],

  Messages: [],

  MessagesLoading: false,



  isSoundEnabled: JSON.parse(localStorage.getItem("soundEnabled")) === true,


  toggleSound: () => {
    localStorage.setItem("soundEnabled", !get().isSoundEnabled)
    set({ isSoundEnabled: !get().isSoundEnabled })
  },

  toggleActiveTab: (tab) => {
    set({ activeTab: tab })
  },


  setSelectedUser: (user) => set({ selectedUser: user }),








  getContacts: async () => {
    set({ isContactsLoading: true })
    try {
      const res = await axiosClient.get("/message/contacts")
      set({ allContacts: res.data })
    } catch (error) {
      console.log("Unable get Contacts", error)
    } finally {
      set({ isContactsLoading: false })
    }
  },


  getChatPartners: async () => {
    set({ ischatPartnersLoading: true })
    try {
      const res = await axiosClient.get("/message/chat")
      set({ chatPartners: res.data })
    } catch (error) {
      console.log("Unable get Contacts", error)
    } finally {
      set({ ischatPartnersLoading: false })
    }
  },



  getMessageByUser: async (userToChatId) => {

    set({ MessagesLoading: true })

    try {
      const res = await axiosClient.get(`/message/getmessages/${userToChatId}`)

      set({ Messages: res.data })

    } catch (error) {
      console.log("Error fetching messages of the user");
      toast.error(error?.response?.data?.message || error?.message || "Failed to fetch messages")


    } finally {
      set({ MessagesLoading: false })
    }

  },


  sendMessage: async (message) => {
    const tempId = `temp-${Date.now()}`;


    const { Messages, selectedUser } = get()
    const { loggedinUser } = useAuthStore.getState()
    const instantMessage = {
      _id: tempId,
      senderId: loggedinUser._id,
      receiverId: selectedUser._id,
      text: message.text,
      image: message.image,
      createdAt: new Date().toISOString()
    }

    set({ Messages: [...Messages, instantMessage] })



    try {
      const res = await axiosClient.post(`/message/send/${selectedUser._id}`, message)
      set({ Messages: [...Messages, res.data] })
      toast.success("Message sent")

    } catch (error) {
      console.log("Error Sending Messages", error);
      set({ Messages: Messages })
      toast.error(error?.response?.data?.message || error?.message || "Failed to send message")
    }



  },



  getSocketMessages:()=>{

    
    const {selectedUser,isSoundEnabled}=get()

    
    
    if(!selectedUser) return;
    
    const socket = useAuthStore.getState().socket;
    if(!socket) return;

    // ensure we don't attach multiple listeners
    socket.off("newMessage");

    socket.on("newMessage",(newMessage)=>{
      const isMessageSentFromSelectedUser = newMessage.senderId == selectedUser._id;
      if(!isMessageSentFromSelectedUser) return

      const currentMessages=get().Messages
      set({Messages:[...currentMessages,newMessage]})

      if(isSoundEnabled){
        const notificationSound=new Audio('/notification.mp3')
        notificationSound.currentTime=0;
        notificationSound.play().catch((error)=>console.log("Error playing notification sound",error))

      }


    })
  },

  disconnectSocketMessage:()=>{
    const socket=useAuthStore.getState().socket
    socket.off("newMessage")
  }

}))



export default useChatStore