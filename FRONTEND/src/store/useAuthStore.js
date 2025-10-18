import { create } from "zustand";
import axiosClient from "../libs/axiosClient";
import toast from "react-hot-toast";
import { data } from "react-router";

 export const useAuthStore=create((set,get)=>({

  loggedinUser:null,

  isloggin:false,

  isSigning:false,
  isloggingin:false,





  checkLogin:async()=>{
    set({isloggin:true})
    try {
      const res=await axiosClient.get("/auth/check");
      
        
        set({loggedinUser:res.data})
        set({isloggin:false})

      
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
      
    } catch (error) {
      toast.error(error.response.data.message)

      
    }finally{
          set({isSigning:false})
    }
  },


  logout:async ()=>{
    try {
      const res=await axiosClient.post("/auth/logout")
      set({loggedinUser:null})
      toast.error(res.data)
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
  
} catch (error) {
  toast.error(error.response.data.message)
  console.log("User not Logged in");
    
}finally{
    set({isloggingin:false})

}

  },



 

})
)