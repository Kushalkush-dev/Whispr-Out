import { LogOutIcon } from 'lucide-react'
import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

const ChatPage = () => {

  const {logout ,loggedinUser}=useAuthStore()

  console.log(
    loggedinUser
  );
  

  return (
    <div className='z-30'>
      <button onClick={logout} className='btn '><LogOutIcon/>Logout</button>
      
    </div>
  )
}

export default ChatPage