import { create } from "zustand";

 export const useAuthStore=create((set,get)=>({

  loggedin:false,

  log:()=>{
    const loggedin=get().loggedin
    set({loggedin:!loggedin})

    console.log("logged");
    
  }
})
  )