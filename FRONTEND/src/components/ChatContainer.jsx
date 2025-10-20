import React, { useEffect } from 'react'
import useChatStore from '../store/useChatStore'
import { XIcon } from 'lucide-react'

const ChatContainer = () => {



const {selectedUser,setSelectedUser}= useChatStore()


useEffect(()=>{
  const handleEscape=(event)=>{
  
    if(event.key==="Escape") setSelectedUser(null)
  
  }

  window.addEventListener("keydown",handleEscape)

  return()=> window.removeEventListener("keydown",handleEscape)
},[setSelectedUser])


 return (

  <div className='flex w-full px-3 py-2 items-center max-h-[65px] flex-1 justify-between border-b border-slate-600 '>

    <div className='flex items-center gap-4'>

      <div className='avatar online'>
        <div className='rounded-full w-12 '>
        <img src={selectedUser.profilepic || "/avatar.png"} alt={selectedUser.fullname} />
        </div>
      </div>


      <div>
      <h3 className='font-medium'>{selectedUser.fullname}</h3>
      <p className='text-xs'>Online</p>
      </div>

    </div>

    <div>
      <button onClick={()=>setSelectedUser(null)} className='flex items-center hover:text-rose-500'><XIcon/></button>
    </div>

  </div>
  
  )
}

export default ChatContainer