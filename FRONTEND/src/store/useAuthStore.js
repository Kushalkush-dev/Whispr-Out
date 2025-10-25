import { create } from "zustand";
import axiosClient from "../libs/axiosClient";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";
 export const useAuthStore=create((set,get)=>({

  loggedinUser:null,

  isloggin:false,

  isSigning:false,
  isloggingin:false,

  socket:null,
  onlineUsers:[],





  checkLogin:async()=>{
    set({isloggin:true})
    try {
      const res=await axiosClient.get("/auth/check");
      
        
        set({loggedinUser:res.data})
        set({isloggin:false})

        get().connectSocket()

      
    } catch (error) {
      console.log("User Not Authenticated");
      set({loggedinUser:null})
      
    }finally{
      set({isloggin:false})

    }
    
    
  },

  signUp:async(form)=>{
    set({isSigning:true})
    try {

      const res=await axiosClient.post("/auth/signup",form)

      set({loggedinUser:res.data})

      toast.success("User Created Successfully")

      get().connectSocket()
      
    } catch (error) {
  toast.error(error?.response?.data?.message || error?.message || "Signup failed")

      
    }finally{
          set({isSigning:false})
    }
  },


  logout:async ()=>{
    try {
      const res=await axiosClient.post("/auth/logout")
      set({loggedinUser:null})
      toast.error(res.data)
      get().disconnectSocket()

    } catch (error) {
      console.log("User Not Logged Out",error);
      
    }finally{
      set({loggedinUser:null})
    }

  },

  login:async(data)=>{
try {
  set({isloggingin:true})
  const res=await axiosClient.post('/auth/login',data)

  set({loggedinUser:res.data})
  toast.success("Login Successfull")
  get().connectSocket()

  
} catch (error) {
  toast.error(error?.response?.data?.message || error?.message || "Login failed")
  console.log("User not Logged in");
    
}finally{
    set({isloggingin:false})

}

  },



  updateProfile:async(data)=>{
    try {
      const res=await axiosClient.put('/auth/updateprofile',data)
     
       set({loggedinUser:res.data})

       
      
      toast.success("Profile Updated Successfully")
              
    } catch (error) {
      console.log("Failed in Update Profile",error);
  toast.error(error?.response?.data?.message || error?.message || "Update failed")
      
    }

  },


 connectSocket: () => {
    const { loggedinUser } = get();
    if (!loggedinUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      withCredentials: true,
    });

    socket.connect();

    set({ socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },

})
)